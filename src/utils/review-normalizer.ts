import { formatDate } from './date/format-date';
import { determineSentiment } from './determine-rating';

import {
  HostawayReview,
  GoogleReview,
  NormalizedReview,
  NormalizedReviewCategory,
  PropertyAnalytics,
  ReviewFilters,
  SortOptions
} from '@/types/review';

// Category display name mapping
const categoryDisplayNames: Record<string, string> = {
  cleanliness: 'Cleanliness',
  communication: 'Communication',
  location: 'Location',
  value: 'Value',
  accuracy: 'Accuracy',
  check_in: 'Check-in',
  respect_house_rules: 'House Rules',
  amenities: 'Amenities'
};

// Channel icons/labels
const channelInfo: Record<string, { icon: string; label: string }> = {
  airbnb: { icon: '🏠', label: 'Airbnb' },
  'booking.com': { icon: '🅱️', label: 'Booking.com' },
  vrbo: { icon: '🏡', label: 'VRBO' },
  direct: { icon: '🔗', label: 'Direct Booking' },
  expedia: { icon: '✈️', label: 'Expedia' },
  google: { icon: '🔍', label: 'Google' }
};

/**
 * Generates a listing ID from listing name
 */
function generateListingId(listingName: string): string {
  return listingName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Calculates average rating from category ratings
 */
function calculateAverageRating(categories: { rating: number }[]): number | null {
  if (!categories || categories.length === 0) return null;
  const sum = categories.reduce((acc, cat) => acc + cat.rating, 0);
  // Convert from 10-scale to 5-scale
  return Math.round((sum / categories.length / 2) * 10) / 10;
}

/**
 * Normalizes a single Hostaway review
 */
export function normalizeReview(
  review: HostawayReview,
  approvedIds: Set<number> = new Set()
): NormalizedReview {
  const categories: NormalizedReviewCategory[] = review.reviewCategory.map((cat) => ({
    category: cat.category,
    rating: cat.rating,
    displayName: categoryDisplayNames[cat.category] || cat.category
  }));

  const averageRating = calculateAverageRating(review.reviewCategory);
  const channel = review.channel || 'direct';

  return {
    id: review.id,
    type: review.type,
    status: review.status,
    overallRating: review.rating,
    averageRating,
    publicReview: review.publicReview,
    privateReview: review.privateReview,
    categories,
    submittedAt: new Date(review.submittedAt),
    formattedDate: formatDate(review.submittedAt),
    guestName: review.guestName,
    listingName: review.listingName,
    listingId: generateListingId(review.listingName),
    channel,
    channelIcon: channelInfo[channel]?.icon || '',
    isApprovedForWebsite: approvedIds.has(review.id),
    sentiment: determineSentiment(review.rating)
  };
}

/**
 * Normalizes an array of Hostaway reviews
 */
export function normalizeReviews(
  reviews: HostawayReview[],
  approvedIds: Set<number> = new Set()
): NormalizedReview[] {
  return reviews.map((review) => normalizeReview(review, approvedIds));
}

/**
 * Filters normalized reviews based on filter criteria
 */
export function filterReviews(
  reviews: NormalizedReview[],
  filters: ReviewFilters
): NormalizedReview[] {
  return reviews.filter((review) => {
    // Filter by listing
    if (filters.listingId && review.listingId !== filters.listingId) {
      return false;
    }

    // Filter by channel
    if (filters.channel && review.channel !== filters.channel) {
      return false;
    }

    // Filter by type
    if (filters.type && review.type !== filters.type) {
      return false;
    }

    // Filter by status
    if (filters.status && review.status !== filters.status) {
      return false;
    }

    // Filter by minimum rating
    if (filters.minRating !== undefined) {
      // Exclude reviews without a rating when filtering by rating
      if (review.overallRating === null || review.overallRating < filters.minRating) {
        return false;
      }
    }

    // Filter by maximum rating
    if (filters.maxRating !== undefined) {
      // Exclude reviews without a rating when filtering by rating
      if (review.overallRating === null || review.overallRating > filters.maxRating) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      if (review.submittedAt < fromDate) {
        return false;
      }
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      if (review.submittedAt > toDate) {
        return false;
      }
    }

    // Filter by sentiment
    if (filters.sentiment && review.sentiment !== filters.sentiment) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText =
        `${review.publicReview} ${review.guestName} ${review.listingName}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Filter by approval status
    if (filters.approvedOnly && !review.isApprovedForWebsite) {
      return false;
    }

    return true;
  });
}

/**
 * Sorts normalized reviews
 */
export function sortReviews(reviews: NormalizedReview[], sort: SortOptions): NormalizedReview[] {
  const sorted = [...reviews];

  sorted.sort((reviewA, reviewB) => {
    let comparison = 0;

    switch (sort.field) {
      case 'date':
        comparison = reviewA.submittedAt.getTime() - reviewB.submittedAt.getTime();
        break;
      case 'rating':
        comparison = (reviewA.overallRating ?? 0) - (reviewB.overallRating ?? 0);
        break;
      case 'guestName':
        comparison = reviewA.guestName.localeCompare(reviewB.guestName);
        break;
      case 'listingName':
        comparison = reviewA.listingName.localeCompare(reviewB.listingName);
        break;
    }

    return sort.direction === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

/**
 * Calculates analytics for properties
 */
export function calculatePropertyAnalytics(reviews: NormalizedReview[]): PropertyAnalytics[] {
  const listingsMap = new Map<string, NormalizedReview[]>();

  // Group reviews by listing
  reviews.forEach((review) => {
    const existing = listingsMap.get(review.listingId) || [];
    existing.push(review);
    listingsMap.set(review.listingId, existing);
  });

  const analytics: PropertyAnalytics[] = [];

  listingsMap.forEach((listingReviews, listingId) => {
    // Only consider guest-to-host reviews for analytics
    const guestReviews = listingReviews.filter((review) => review.type === 'guest-to-host');

    if (guestReviews.length === 0) return;

    // Calculate average rating
    const ratingsWithValue = guestReviews.filter((review) => review.overallRating !== null);
    const averageRating =
      ratingsWithValue.length > 0
        ? ratingsWithValue.reduce((sum, review) => sum + (review.overallRating || 0), 0) /
          ratingsWithValue.length
        : 0;

    // Calculate category averages
    const categoryTotals: Record<string, { sum: number; count: number }> = {};
    guestReviews.forEach((review) => {
      review.categories.forEach((category) => {
        if (!categoryTotals[category.displayName]) {
          categoryTotals[category.displayName] = { sum: 0, count: 0 };
        }
        categoryTotals[category.displayName].sum += category.rating;
        categoryTotals[category.displayName].count += 1;
      });
    });

    const categoryAverages: Record<string, number> = {};
    Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
      categoryAverages[category] = Math.round((sum / count) * 10) / 10;
    });

    // Calculate rating distribution
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingsWithValue.forEach((review) => {
      const rating = review.overallRating!;
      ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
    });

    // Determine trend (comparing last 3 reviews to previous 3)
    const sortedByDate = [...guestReviews].sort(
      (reviewA, reviewB) => reviewB.submittedAt.getTime() - reviewA.submittedAt.getTime()
    );

    let recentTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (sortedByDate.length >= 6) {
      const recentAvg =
        sortedByDate
          .slice(0, 3)
          .filter((review) => review.overallRating)
          .reduce((sum, review) => sum + (review.overallRating || 0), 0) / 3;
      const previousAvg =
        sortedByDate
          .slice(3, 6)
          .filter((review) => review.overallRating)
          .reduce((sum, review) => sum + (review.overallRating || 0), 0) / 3;

      if (recentAvg > previousAvg + 0.3) recentTrend = 'improving';
      else if (recentAvg < previousAvg - 0.3) recentTrend = 'declining';
    }

    // Identify top issues (categories with average below 8)
    const topIssues: string[] = [];
    Object.entries(categoryAverages).forEach(([category, avg]) => {
      if (avg < 8) {
        topIssues.push(category);
      }
    });

    // Calculate channel breakdown
    const channelBreakdown: Record<string, number> = {};
    guestReviews.forEach((review) => {
      channelBreakdown[review.channel] = (channelBreakdown[review.channel] || 0) + 1;
    });

    analytics.push({
      listingId,
      listingName: guestReviews[0].listingName,
      totalReviews: guestReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      categoryAverages,
      ratingDistribution,
      recentTrend,
      topIssues,
      approvedCount: guestReviews.filter((review) => review.isApprovedForWebsite).length,
      channelBreakdown
    });
  });

  // Sort by total reviews descending
  return analytics.sort(
    (analyticsA, analyticsB) => analyticsB.totalReviews - analyticsA.totalReviews
  );
}

/**
 * Paginates reviews
 */
export function paginateReviews(
  reviews: NormalizedReview[],
  page: number,
  pageSize: number
): NormalizedReview[] {
  const start = (page - 1) * pageSize;
  return reviews.slice(start, start + pageSize);
}

/**
 * Normalizes a single Google review to match NormalizedReview format
 */
export function normalizeGoogleReview(
  review: GoogleReview,
  listingName: string,
  index: number,
  approvedIds: Set<number> = new Set()
): NormalizedReview {
  const id = Math.abs(
    review.name
      .split('/')
      .pop()
      ?.split('')
      .reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0) || index + 100000
  );

  const submittedAt = new Date(review.publishTime);

  return {
    id,
    type: 'guest-to-host',
    status: 'published',
    overallRating: review.rating,
    averageRating: review.rating,
    publicReview: review.text?.text || '',
    // Google doesn't provide category breakdowns
    categories: [],
    submittedAt,
    formattedDate: formatDate(review.publishTime),
    guestName: review.authorAttribution?.displayName || 'Google User',
    listingName,
    listingId: generateListingId(listingName),
    channel: 'google',
    channelIcon: channelInfo.google.icon,
    isApprovedForWebsite: approvedIds.has(id),
    sentiment: determineSentiment(review.rating)
  };
}

/**
 * Normalizes an array of Google reviews
 */
export function normalizeGoogleReviews(
  reviews: GoogleReview[],
  listingName: string,
  approvedIds: Set<number> = new Set()
): NormalizedReview[] {
  return reviews.map((review, index) =>
    normalizeGoogleReview(review, listingName, index, approvedIds)
  );
}
