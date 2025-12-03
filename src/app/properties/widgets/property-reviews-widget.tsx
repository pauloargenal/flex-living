'use client';

import { usePublicReviews } from '@/hooks/use-public-reviews';
import { StarRating } from '@/components/star-rating';
import { CategoryBadge } from '@/components/category-badge';
import { RatingBar } from '@/components/rating-bar';
import type { PublicReview } from '@/types/review';

interface PropertyReviewCardProps {
  review: PublicReview;
}

function PropertyReviewCard({ review }: PropertyReviewCardProps) {
  const initials = review.guestName
    .split(' ')
    .map((initial) => initial[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-black-10">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-green-10 flex items-center justify-center flex-shrink-0">
          <span className="text-green-100 font-semibold">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-black-100">{review.guestName}</h4>
            <span className="text-sm text-black-50 flex-shrink-0">{review.date}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm font-medium text-black-70">{review.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-black-70 leading-relaxed">{review.review}</p>

      {review.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black-10">
          {review.categories.slice(0, 4).map((cat) => (
            <CategoryBadge key={cat.category} displayName={cat.displayName} rating={cat.rating} />
          ))}
        </div>
      )}
    </div>
  );
}

interface PropertyReviewsWidgetLocale {
  title: string;
  verifiedReviews: string;
  averageRating: string;
  basedOn: string;
  noReviews: {
    title: string;
    description: string;
  };
  loading: string;
}

interface PropertyReviewsWidgetProps {
  listingId: string;
  locale: Record<string, string>;
}

export function PropertyReviewsWidget({ listingId, locale }: PropertyReviewsWidgetProps) {
  const { reviews, stats, loading } = usePublicReviews(listingId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-green-100 border-t-transparent rounded-full animate-spin" />
          <span className="text-black-60">{locale.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <>
          <h2 className="text-2xl font-bold text-black-100">{locale.title}</h2>
          {stats && stats.totalReviews > 0 && (
            <p className="text-black-60 mt-1">
              {stats.totalReviews} {locale['reviews.verifiedReviews']} {stats.averageRating}
              {locale['reviews.averageRating']}
            </p>
          )}
        </>
      </div>

      {stats && stats.totalReviews > 0 && (
        <div className="bg-white rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-bold text-black-100">{stats.averageRating}</span>
              <>
                <StarRating rating={Math.round(stats.averageRating)} size="lg" />
                <p className="text-sm text-black-50 mt-1">
                  {stats.totalReviews} {locale['reviews.review.text']}
                </p>
              </>
            </div>
            <p className="text-black-60">{locale.basedOn}</p>
          </>

          <div className="space-y-3">
            {Object.entries(stats.categoryAverages)
              .slice(0, 5)
              .map(([category, rating]) => (
                <div key={category} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-black-70">{category}</span>
                  <div className="flex-1">
                    <RatingBar rating={rating} />
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-black-100">
                    {rating.toFixed(1)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center">
          <h3 className="text-lg font-semibold text-black-100 mb-2">
            {locale['reviews.noReviews.title']}
          </h3>
          <p className="text-black-60">{locale['reviews.noReviews.description']}</p>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <PropertyReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </>
  );
}
