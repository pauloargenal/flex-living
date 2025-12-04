'use client';

import { useState, useEffect, useCallback } from 'react';

import type {
  NormalizedReview,
  PropertyAnalytics,
  ReviewFilters,
  SortOptions,
  Listing,
  Channel
} from '@/types/review';
import {
  fetchReviews,
  fetchListings,
  fetchChannels,
  fetchGoogleReviews,
  toggleReviewApproval,
  bulkUpdateApproval
} from '@/services/reviews-service';

interface UseReviewsReturn {
  reviews: NormalizedReview[];
  analytics: PropertyAnalytics[];
  listings: Listing[];
  channels: Channel[];
  loading: boolean;
  error: string | null;
  meta: {
    total: number;
    filtered: number;
    page: number;
    pageSize: number;
  };
  filters: ReviewFilters;
  sort: SortOptions;
  selectedReviews: Set<number>;
  setFilters: (filters: ReviewFilters) => void;
  setSort: (sort: SortOptions) => void;
  handleApprovalToggle: (reviewId: number, approved: boolean) => Promise<void>;
  handleSelectReview: (reviewId: number) => void;
  handleBulkApprove: (approve: boolean) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useFetchReviews(): UseReviewsReturn {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [analytics, setAnalytics] = useState<PropertyAnalytics[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, filtered: 0, page: 1, pageSize: 20 });

  const [filters, setFilters] = useState<ReviewFilters>({});
  const [sort, setSort] = useState<SortOptions>({ field: 'date', direction: 'desc' });
  const [selectedReviews, setSelectedReviews] = useState<Set<number>>(new Set());

  const handleLoadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both Hostaway and Google reviews in parallel
      const [hostawayResult, googleReviewsRaw] = await Promise.all([
        fetchReviews({ filters, sort, pageSize: 50 }),
        !filters.channel || filters.channel === 'google'
          ? fetchGoogleReviews()
          : Promise.resolve([])
      ]);

      const hostawayReviews = hostawayResult.reviews.map((review) => ({
        ...review,
        submittedAt: new Date(review.submittedAt)
      }));

      const googleReviews = googleReviewsRaw.map((review) => ({
        ...review,
        submittedAt: new Date(review.submittedAt)
      }));

      // Merge reviews from both sources
      let allReviews = [...hostawayReviews];

      // Add Google reviews if not filtering by a non-Google channel
      if (!filters.channel || filters.channel === 'google') {
        const filteredGoogleReviews = googleReviews.filter((review) => {
          if (filters.minRating && review.overallRating && review.overallRating < filters.minRating)
            return false;
          if (filters.maxRating && review.overallRating && review.overallRating > filters.maxRating)
            return false;
          if (filters.sentiment && review.sentiment !== filters.sentiment) return false;
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const searchText =
              `${review.publicReview} ${review.guestName} ${review.listingName}`.toLowerCase();
            if (!searchText.includes(query)) return false;
          }
          return true;
        });

        // If filtering specifically for Google, only show Google reviews
        if (filters.channel === 'google') {
          allReviews = filteredGoogleReviews;
        } else {
          allReviews = [...hostawayReviews, ...filteredGoogleReviews];
        }
      }

      // Sort combined reviews
      allReviews.sort((reviewA, reviewB) => {
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

      setReviews(allReviews);
      setAnalytics(hostawayResult.analytics);
      setMeta({
        ...hostawayResult.meta,
        total: hostawayResult.meta.total + googleReviewsRaw.length,
        filtered: allReviews.length
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  const handleLoadMetaData = useCallback(async () => {
    try {
      const [listingsData, channelsData] = await Promise.all([fetchListings(), fetchChannels()]);
      setListings(listingsData);
      setChannels(channelsData);
    } catch {
      setError('Failed to fetch listings or channels');
    }
  }, []);

  useEffect(() => {
    handleLoadMetaData();
  }, [handleLoadMetaData]);

  useEffect(() => {
    handleLoadReviews();
  }, [handleLoadReviews]);

  const handleApprovalToggle = useCallback(async (reviewId: number, approved: boolean) => {
    try {
      await toggleReviewApproval(reviewId, approved);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, isApprovedForWebsite: approved } : review
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError('Failed to toggle review approval');
      }
    }
  }, []);

  const handleSelectReview = useCallback((reviewId: number) => {
    setSelectedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  }, []);

  const handleBulkApprove = useCallback(
    async (approve: boolean) => {
      const reviewIds = Array.from(selectedReviews);

      try {
        await bulkUpdateApproval(reviewIds, approve);
        setReviews((prev) =>
          prev.map((review) =>
            selectedReviews.has(review.id) ? { ...review, isApprovedForWebsite: approve } : review
          )
        );
        setSelectedReviews(new Set());
      } catch {
        setError('Failed to bulk update approval status');
      }
    },
    [selectedReviews]
  );

  return {
    reviews,
    analytics,
    listings,
    channels,
    loading,
    error,
    meta,
    filters,
    sort,
    selectedReviews,
    setFilters,
    setSort,
    handleApprovalToggle,
    handleSelectReview,
    handleBulkApprove,
    refetch: handleLoadReviews
  };
}
