import { NextRequest, NextResponse } from 'next/server';

import { mockHostawayReviews, getUniqueListings, getUniqueChannels } from '@/data/mock-reviews';
import {
  normalizeReviews,
  filterReviews,
  sortReviews,
  calculatePropertyAnalytics,
  paginateReviews
} from '@/utils/review-normalizer';
import { ReviewFilters, SortOptions, ReviewsApiResponse } from '@/types/review';

// Hostaway API configuration
const HOSTAWAY_API_URL = 'https://api.hostaway.com/v1';
const HOSTAWAY_ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID || '61148';
const HOSTAWAY_API_KEY =
  process.env.HOSTAWAY_API_KEY ||
  'f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152';

// In-memory storage for approved review IDs (in production, use database)
const approvedReviewIds = new Set<number>([
  7453, 7455, 7457, 7458, 7460, 7461, 7463, 7466, 7467, 7468, 7469, 7472, 7474, 7478
]);

/**
 * Fetches reviews from Hostaway API
 * Since the sandbox has no reviews, we fall back to mock data
 */
async function fetchHostawayReviews() {
  try {
    const response = await fetch(`${HOSTAWAY_API_URL}/reviews`, {
      headers: {
        Authorization: `Bearer ${HOSTAWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      return mockHostawayReviews;
    }

    const data = await response.json();

    if (!data.result || data.result.length === 0) {
      return mockHostawayReviews;
    }

    return data.result;
  } catch (error) {
    return mockHostawayReviews;
  }
}

/**
 * GET /api/reviews/hostaway
 * Fetches, normalizes, and returns reviews with optional filtering, sorting, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters from query params
    const filters: ReviewFilters = {
      listingId: searchParams.get('listingId') || undefined,
      channel: searchParams.get('channel') || undefined,
      type: (searchParams.get('type') as 'host-to-guest' | 'guest-to-host') || undefined,
      status: searchParams.get('status') || undefined,
      minRating: searchParams.get('minRating')
        ? parseInt(searchParams.get('minRating')!, 10)
        : undefined,
      maxRating: searchParams.get('maxRating')
        ? parseInt(searchParams.get('maxRating')!, 10)
        : undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      sentiment:
        (searchParams.get('sentiment') as 'positive' | 'neutral' | 'negative') || undefined,
      searchQuery: searchParams.get('search') || undefined,
      approvedOnly: searchParams.get('approvedOnly') === 'true'
    };

    // Parse sort options
    const sort: SortOptions = {
      field:
        (searchParams.get('sortField') as 'date' | 'rating' | 'guestName' | 'listingName') ||
        'date',
      direction: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'desc'
    };

    // Parse pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    // Fetch reviews (will use mock data since sandbox is empty)
    const rawReviews = await fetchHostawayReviews();

    // Normalize reviews
    const normalizedReviews = normalizeReviews(rawReviews, approvedReviewIds);

    // Filter reviews (default to guest-to-host if not specified)
    const filteredReviews = filterReviews(normalizedReviews, {
      ...filters,
      type: filters.type || 'guest-to-host'
    });

    // Sort reviews
    const sortedReviews = sortReviews(filteredReviews, sort);

    // Calculate analytics
    const analytics = calculatePropertyAnalytics(normalizedReviews);

    // Paginate
    const paginatedReviews = paginateReviews(sortedReviews, page, pageSize);

    const response: ReviewsApiResponse = {
      success: true,
      data: paginatedReviews,
      analytics,
      meta: {
        total: normalizedReviews.filter((review) => review.type === 'guest-to-host').length,
        filtered: filteredReviews.length,
        page,
        pageSize
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

/**
 * GET /api/reviews/hostaway/listings
 * Returns list of unique listings
 */
export async function listings() {
  return NextResponse.json({
    success: true,
    data: getUniqueListings()
  });
}

/**
 * GET /api/reviews/hostaway/channels
 * Returns list of unique channels
 */
export async function channels() {
  return NextResponse.json({
    success: true,
    data: getUniqueChannels()
  });
}
