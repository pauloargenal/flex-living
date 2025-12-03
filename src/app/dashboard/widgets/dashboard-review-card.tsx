'use client';

import { useMemo } from 'react';

import type { NormalizedReview } from '@/types/review';
import { StarRating } from '@/components/star-rating';
import { CategoryBadge } from '@/components/category-badge';

interface DashboardReviewCardLocale {
  approved: string;
  approveForWebsite: string;
  id: string;
}

interface SentimentLabels {
  positive: string;
  neutral: string;
  negative: string;
}

interface DashboardReviewCardProps {
  review: NormalizedReview;
  onApprovalToggle: (reviewId: number, approved: boolean) => void;
  selected?: boolean;
  onSelect?: (reviewId: number) => void;
  locale: Record<string, string>;
  sentimentLocale: Record<string, string>;
}

const channelColors: Record<string, string> = {
  airbnb: 'bg-[#FF5A5F] text-white',
  'booking.com': 'bg-[#003580] text-white',
  vrbo: 'bg-[#3D67FF] text-white',
  direct: 'bg-green-100 text-white',
  expedia: 'bg-[#00355F] text-white'
};

const sentimentColors: Record<string, string> = {
  positive: 'border-l-green-100',
  neutral: 'border-l-citrine-100',
  negative: 'border-l-cienna-100'
};

export function DashboardReviewCard({
  review,
  onApprovalToggle,
  selected,
  onSelect,
  locale,
  sentimentLocale
}: DashboardReviewCardProps) {
  const channelClass = channelColors[review.channel] || 'bg-black-30 text-black-100';
  const sentimentClass = sentimentColors[review.sentiment] || 'border-l-black-30';

  const sentimentColor = useMemo(() => {
    if (review.sentiment === 'positive') {
      return 'bg-green-10 text-green-100';
    }
    if (review.sentiment === 'neutral') {
      return 'bg-citrine-10 text-hazel';
    }
    return 'bg-cienna-10 text-cienna-100';
  }, [review.sentiment]);

  const approveText = review.isApprovedForWebsite
    ? locale['reviewCard.approved']
    : locale['reviewCard.approveForWebsite'];

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-black-10 border-l-4 relative flex flex-col gap-4 ${sentimentClass} 
        hover:shadow-md transition-all duration-200 ${selected ? 'ring-2 ring-green-100' : ''}`}
    >
      <div className="p-4 border-b border-black-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {onSelect && (
                <input
                  aria-label={locale['reviewCard.select']}
                  type="checkbox"
                  checked={selected}
                  onChange={() => onSelect(review.id)}
                  className="w-4 h-4 rounded border-black-30 text-green-100 focus:ring-green-100 cursor-pointer"
                />
              )}
              <h3 className="font-semibold text-black-100 truncate">{review.guestName}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${channelClass}`}>
                {review.channelIcon} {review.channel}
              </span>
            </div>
            <p className="text-sm text-black-60 truncate">{review.listingName}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {review.overallRating && (
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={review.overallRating} size="sm" />
                <span className="font-bold text-lg text-black-100">{review.overallRating}</span>
              </div>
            )}
            <p className="text-xs text-black-50">{review.formattedDate}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-black-80 text-sm leading-relaxed line-clamp-3">
          {review.publicReview ?? locale['reviewCard.noReviewText']}
        </p>
      </div>

      {review.categories.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {review.categories.slice(0, 5).map((cat) => (
              <CategoryBadge key={cat.category} displayName={cat.displayName} rating={cat.rating} />
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-3 border-t border-black-10 bg-black-5 rounded-b-xl flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            ${sentimentColor}`}
          >
            {sentimentLocale[review.sentiment]}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onApprovalToggle(review.id, !review.isApprovedForWebsite)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
            ${
              review.isApprovedForWebsite
                ? 'bg-green-100 text-white hover:bg-green-80'
                : 'bg-white border border-black-20 text-black-70 hover:border-green-100 hover:text-green-100'
            }`}
        >
          {approveText}
        </button>
      </div>
    </div>
  );
}
