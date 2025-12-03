'use client';

import { useMemo, useState } from 'react';
import { ClockIcon, RefreshCcwIcon, SearchIcon } from 'lucide-react';

import { DashboardFilterBar } from './widgets/dashboard-filter-bar';
import { DashboardReviewCard } from './widgets/dashboard-review-card';
import { DashboardAnalytics } from './widgets/dashboard-analytics';

import { LoadingSpinner } from '@/components/loading-spinner';
import { useReviews } from '@/hooks/use-reviews';

interface DashboardWidgetProps {
  locale: Record<string, string>;
  sentimentLabels: Record<string, string>;
  trendsLocale: Record<string, string>;
  ratingsLocale: Record<string, string>;
}

export function DashboardLayout({
  locale,
  sentimentLabels,
  trendsLocale,
  ratingsLocale
}: DashboardWidgetProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'analytics'>('reviews');

  const {
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
    refetch
  } = useReviews();

  const refreshTime = useMemo(() => {
    return locale.dataRefreshed && `${locale.dataRefreshed}: ${new Date().toLocaleTimeString()}`;
  }, [locale.dataRefreshed]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black-100">{locale.pageTitle}</h1>
        <p className="text-black-60 mt-1">{locale.pageDescription}</p>
      </div>

      <div className="flex items-center gap-1 mb-6 bg-black-5 rounded-lg p-1 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all
            ${
              activeTab === 'reviews'
                ? 'bg-white text-black-100 shadow-sm'
                : 'text-black-60 hover:text-black-100'
            }`}
        >
          {locale['tab.reviews']}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all
            ${
              activeTab === 'analytics'
                ? 'bg-white text-black-100 shadow-sm'
                : 'text-black-60 hover:text-black-100'
            }`}
        >
          {locale['tab.analytics']}
        </button>
      </div>

      <DashboardFilterBar
        listings={listings}
        channels={channels}
        filters={filters}
        sort={sort}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        selectedCount={selectedReviews.size}
        onBulkApprove={handleBulkApprove}
        locale={locale}
        ratingsLocale={ratingsLocale}
      />

      {error && (
        <div className="bg-cienna-10 border border-cienna-100 rounded-lg p-4 mb-6">
          <p className="text-cienna-100 font-medium">{locale['common.error']}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-2 text-sm text-cienna-100 underline hover:no-underline"
          >
            {locale.tryAgain}
          </button>
        </div>
      )}

      {loading && <LoadingSpinner message={locale.loading} />}

      {!loading && !error && (
        <>
          {activeTab === 'reviews' && (
            <>
              {reviews.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <DashboardReviewCard
                      key={review.id}
                      review={review}
                      onApprovalToggle={handleApprovalToggle}
                      selected={selectedReviews.has(review.id)}
                      onSelect={handleSelectReview}
                      locale={locale}
                      sentimentLocale={sentimentLabels}
                    />
                  ))}
                </div>
              )}

              {reviews.length === 0 && (
                <div className="bg-white rounded-xl border border-black-10 p-12 text-center">
                  <div className="text-5xl mb-4 flex items-center justify-center">
                    <SearchIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-black-100 mb-2">
                    {locale['noReviews.title']}
                  </h3>
                  <p className="text-black-60">{locale['noReviews.description']}</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'analytics' && (
            <DashboardAnalytics
              analytics={analytics}
              totalReviews={meta.total}
              filteredCount={meta.filtered}
              locale={locale}
              trendLabels={trendsLocale}
            />
          )}
        </>
      )}

      <div className="mt-6 flex items-center justify-between text-sm text-black-50">
        <span className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          {refreshTime}
        </span>
        <button
          type="button"
          aria-label={locale.refresh}
          onClick={refetch}
          className="flex items-center gap-2 text-green-100 hover:text-green-80 transition-colors"
        >
          <RefreshCcwIcon className="w-4 h-4" /> {locale.refresh}
        </button>
      </div>
    </main>
  );
}
