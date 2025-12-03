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

export function useReviews(): UseReviewsReturn {
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

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchReviews({ filters, sort, pageSize: 50 });
      setReviews(result.reviews);
      setAnalytics(result.analytics);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  const loadMetadata = useCallback(async () => {
    try {
      const [listingsData, channelsData] = await Promise.all([fetchListings(), fetchChannels()]);
      setListings(listingsData);
      setChannels(channelsData);
    } catch {
      setError('Failed to fetch listings or channels');
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

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
    refetch: loadReviews
  };
}
