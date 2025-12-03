'use client';

import { useCallback, useMemo } from 'react';
import { AlertTriangleIcon } from 'lucide-react';

import type { PropertyAnalytics } from '@/types/review';
import { RatingBar } from '@/components/rating-bar';
import { TrendIndicator } from '@/components/trend-indicator';

interface AnalyticsLocale {
  totalReviews: string;
  showing: string;
  averageRating: string;
  properties: string;
  activeListings: string;
  approved: string;
  forWebsiteDisplay: string;
  categoryPerformance: string;
  propertyPerformance: string;
  reviews: string;
  areasToImprove: string;
}

interface TrendLabels {
  improving: string;
  stable: string;
  declining: string;
}

interface DashboardAnalyticsProps {
  analytics: PropertyAnalytics[];
  totalReviews: number;
  filteredCount: number;
  locale: Record<string, string>;
  trendLabels: Record<string, string>;
}

export function DashboardAnalytics({
  analytics,
  totalReviews,
  filteredCount,
  locale,
  trendLabels
}: DashboardAnalyticsProps) {
  const overallAverage =
    analytics.length > 0
      ? analytics.reduce((sum, analytics) => sum + analytics.averageRating, 0) / analytics.length
      : 0;

  const totalApproved = analytics.reduce((sum, analytics) => sum + analytics.approvedCount, 0);

  const allCategories: Record<string, { sum: number; count: number }> = {};

  analytics.forEach((analytics) => {
    Object.entries(analytics.categoryAverages).forEach(([cat, avg]) => {
      if (!allCategories[cat]) {
        allCategories[cat] = { sum: 0, count: 0 };
      }
      allCategories[cat].sum += avg;
      allCategories[cat].count += 1;
    });
  });

  const categoryAverages = Object.entries(allCategories)
    .map(([category, { sum, count }]) => ({
      category,
      average: sum / count
    }))
    .sort((analytics1, analytics2) => analytics2.average - analytics1.average);

  const averageClass = useMemo(() => {
    if (overallAverage >= 8) {
      return 'text-green-100';
    }
    if (overallAverage >= 6) {
      return 'text-citrine-100';
    }
    return 'text-cienna-100';
  }, [overallAverage]);

  const ratingClass = useCallback((rating: number) => {
    if (rating >= 8) {
      return 'text-green-100';
    }
    if (rating >= 6) {
      return 'text-citrine-100';
    }
    return 'text-cienna-100';
  }, []);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-black-10">
          <p className="text-sm text-black-60 mb-1">{locale['analytics.totalReviews']}</p>
          <p className="text-3xl font-bold text-black-100">{totalReviews}</p>
          <p className="text-xs text-black-50 mt-1">
            {locale['analytics.showing']} {filteredCount}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-black-10">
          <p className="text-sm text-black-60 mb-1">{locale['analytics.averageRating']}</p>
          <p className="text-3xl font-bold text-black-100">{overallAverage.toFixed(1)}</p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(overallAverage) ? 'text-citrine-100' : 'text-black-20'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-black-10">
          <p className="text-sm text-black-60 mb-1">{locale['analytics.properties']}</p>
          <p className="text-3xl font-bold text-black-100">{analytics.length}</p>
          <p className="text-xs text-black-50 mt-1">{locale['analytics.activeListings']}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-black-10">
          <p className="text-sm text-black-60 mb-1">{locale['analytics.approved']}</p>
          <p className="text-3xl font-bold text-green-100">{totalApproved}</p>
          <p className="text-xs text-black-50 mt-1">{locale['analytics.forWebsiteDisplay']}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-black-10">
        <h3 className="text-lg font-semibold text-black-100 mb-4">
          {locale['analytics.categoryPerformance']}
        </h3>
        <div className="space-y-3">
          {categoryAverages.map(({ category, average }) => (
            <div key={category} className="flex items-center gap-3">
              <span className="w-28 text-sm text-black-70 truncate">{category}</span>
              <div className="flex-1">
                <RatingBar rating={average} />
              </div>
              <span
                className={`w-12 text-right text-sm font-semibold
                ${averageClass}`}
              >
                {average.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-black-10">
        <h3 className="text-lg font-semibold text-black-100 mb-4">
          {locale['analytics.propertyPerformance']}
        </h3>
        <div className="space-y-4">
          {analytics.slice(0, 5).map((property) => (
            <div
              key={property.listingId}
              className="border-b border-black-10 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-black-100 truncate">{property.listingName}</h4>
                  <p className="text-xs text-black-50">
                    {property.totalReviews} {locale['analytics.reviews']}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendIndicator trend={property.recentTrend} labels={trendLabels} />
                  <span className="text-lg font-bold text-black-100">
                    {property.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = property.ratingDistribution[rating] || 0;
                  const percentage =
                    property.totalReviews > 0 ? (count / property.totalReviews) * 100 : 0;
                  return (
                    <div key={rating} className="flex-1">
                      <div className="h-8 bg-black-5 rounded relative overflow-hidden">
                        <div
                          className={`absolute bottom-0 left-0 right-0 transition-all duration-500
                            ${ratingClass(rating) ?? 'bg-cienna-100'}`}
                          style={{ height: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-center text-xs text-black-50 mt-1">{rating}</p>
                    </div>
                  );
                })}
              </div>

              {property.topIssues.length > 0 && (
                <div className="mt-2 p-2 bg-cienna-5 rounded-lg">
                  <p className="text-xs text-cienna-100">
                    <AlertTriangleIcon className="w-4 h-4" /> {locale['analytics.areasToImprove']}{' '}
                    {property.topIssues.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
