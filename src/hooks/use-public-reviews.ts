'use client';

import { useState, useEffect } from 'react';

import type { PublicReview, ReviewStats } from '@/types/review';
import { fetchPublicReviews } from '@/services/reviews-service';

interface UsePublicReviewsReturn {
  reviews: PublicReview[];
  stats: ReviewStats | null;
  loading: boolean;
  error: string | null;
}

export function usePublicReviews(listingId?: string): UsePublicReviewsReturn {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPublicReviews(listingId);
        setReviews(result.reviews);
        setStats(result.stats);
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to fetch reviews');
        }
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [listingId]);

  return { reviews, stats, loading, error };
}
