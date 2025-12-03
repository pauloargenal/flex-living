'use client';

import { useState } from 'react';
import { ChevronUpIcon, SearchIcon } from 'lucide-react';

import type { ReviewFilters, SortOptions, Listing, Channel } from '@/types/review';
import Dropdown from '@/components/dropdown';

interface FilterBarLocale {
  searchPlaceholder: string;
  filters: string;
  active: string;
  sortByDate: string;
  sortByRating: string;
  sortByGuest: string;
  sortByProperty: string;
  property: string;
  allProperties: string;
  channel: string;
  allChannels: string;
  rating: string;
  allRatings: string;
  sentiment: string;
  allSentiments: string;
  positive: string;
  neutral: string;
  negative: string;
  fromDate: string;
  toDate: string;
  quickFilters: string;
  approvedOnly: string;
  needsAttention: string;
  last30Days: string;
  clearAll: string;
  selected: string;
  approveAll: string;
  unapproveAll: string;
}

interface DashboardFilterBarProps {
  listings: Listing[];
  channels: Channel[];
  filters: ReviewFilters;
  sort: SortOptions;
  onFiltersChange: (filters: ReviewFilters) => void;
  onSortChange: (sort: SortOptions) => void;
  selectedCount: number;
  onBulkApprove: (approve: boolean) => void;
  locale: Record<string, string>;
  ratingsLocale: Record<string, string>;
}

export function DashboardFilterBar({
  listings,
  channels,
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  selectedCount,
  onBulkApprove,
  locale,
  ratingsLocale
}: DashboardFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ''
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-black-10 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-64">
          <input
            type="text"
            placeholder={locale['filters.searchPlaceholder']}
            value={filters.searchQuery || ''}
            onChange={(event) => onFiltersChange({ ...filters, searchQuery: event.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-black-5 border border-black-10 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent
              placeholder:text-black-40"
            autoComplete="off"
            aria-label={locale['filters.searchPlaceholder']}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black-40" />
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
            ${
              showFilters || hasActiveFilters
                ? 'bg-green-100 text-white'
                : 'bg-black-5 text-black-70 hover:bg-black-10'
            }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {locale['filters.title']}
          {hasActiveFilters && (
            <span className="bg-white text-green-100 text-xs px-1.5 py-0.5 rounded-full">
              {locale['filters.active']}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <Dropdown
            id="sort"
            ariaLabel={locale['filters.sortBy']}
            placeholder={locale['filters.sortByDate']}
            options={[
              {
                value: 'date',
                label: locale['filters.sortByDate'],
                element: <span>{locale['filters.sortByDate']}</span>
              },
              {
                value: 'rating',
                label: locale['filters.sortByRating'],
                element: <span>{locale['filters.sortByRating']}</span>
              },
              {
                value: 'guestName',
                label: locale['filters.sortByGuest'],
                element: <span>{locale['filters.sortByGuest']}</span>
              },
              {
                value: 'listingName',
                label: locale['filters.sortByProperty'],
                element: <span>{locale['filters.sortByProperty']}</span>
              }
            ]}
            value={sort.field}
            containerClassName="w-full text-sm"
            inputClassName="bg-black-5 border border-black-10"
            setValue={(value) => onSortChange({ ...sort, field: value as SortOptions['field'] })}
            noOptionsText={locale['filters.noOptions']}
          />
          <button
            type="button"
            onClick={() =>
              onSortChange({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })
            }
            className="p-2.5 bg-black-5 border border-black-10 rounded-lg hover:bg-black-10 transition-all"
            aria-label={locale['filters.sortByDate']}
          >
            <ChevronUpIcon
              className={`w-5 h-5 text-black-70 transition-transform ${
                sort.direction === 'asc' ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-black-60">
              {selectedCount} {locale['filters.selected']}
            </span>
            <button
              type="button"
              onClick={() => onBulkApprove(true)}
              className="px-3 py-2 bg-green-100 text-white text-sm font-medium rounded-lg hover:bg-green-80 transition-all"
            >
              {locale['filters.approveAll']}
            </button>
            <button
              type="button"
              onClick={() => onBulkApprove(false)}
              className="px-3 py-2 bg-cienna-100 text-white text-sm font-medium rounded-lg hover:bg-cienna-80 transition-all"
            >
              {locale['filters.unapproveAll']}
            </button>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="pt-4 border-t border-black-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Dropdown
              id="property"
              label={locale['filters.property']}
              ariaLabel={locale['filters.property']}
              placeholder={locale['filters.property']}
              options={listings.map((listing) => ({
                value: listing.id,
                label: listing.name,
                element: <span>{listing.name}</span>
              }))}
              containerClassName="w-full text-sm"
              inputClassName="bg-black-5 border border-black-10"
              value={filters.listingId || ''}
              setValue={(value) => onFiltersChange({ ...filters, listingId: String(value) })}
              noOptionsText={locale['filters.noOptions']}
            />

            <Dropdown
              id="channel"
              label={locale['filters.channel']}
              ariaLabel={locale['filters.channel']}
              placeholder={locale['filters.channel']}
              options={channels.map((channel) => ({
                value: channel.id,
                label: channel.name,
                element: <span>{channel.name}</span>
              }))}
              containerClassName="w-full text-sm"
              inputClassName="bg-black-5 border border-black-10"
              value={filters.channel || ''}
              setValue={(value) => onFiltersChange({ ...filters, channel: String(value) })}
              noOptionsText={locale['filters.noOptions']}
            />

            <Dropdown
              id="rating"
              label={locale['filters.rating']}
              ariaLabel={locale['filters.rating']}
              placeholder={locale['filters.rating']}
              options={['5', '4', '3', '2', '1'].map((rating) => ({
                value: rating.toString(),
                label: rating.toString(),
                element: <span>{ratingsLocale[`${rating.toString()}.stars`]}</span>
              }))}
              containerClassName="w-full text-sm"
              inputClassName="bg-black-5 border border-black-10"
              value={filters.maxRating?.toString() || ''}
              setValue={(value) => {
                onFiltersChange({
                  ...filters,
                  maxRating: Number(value),
                  minRating: Number(value)
                });
              }}
              noOptionsText={locale['filters.noOptions']}
            />

            <Dropdown
              id="sentiment"
              label={locale['filters.sentiment']}
              ariaLabel={locale['filters.sentiment']}
              placeholder={locale['filters.sentiment']}
              options={['positive', 'neutral', 'negative'].map((sentiment) => ({
                value: sentiment,
                label: sentiment
              }))}
              containerClassName="w-full text-sm"
              inputClassName="bg-black-5 border border-black-10"
              value={filters.sentiment || ''}
              setValue={(value) =>
                onFiltersChange({ ...filters, sentiment: value as ReviewFilters['sentiment'] })
              }
              noOptionsText={locale['filters.noOptions']}
            />

            <label className="block text-xs text-black-60 mb-1" htmlFor="fromDate">
              {locale['filters.fromDate']}
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(event) => onFiltersChange({ ...filters, dateFrom: event.target.value })}
                className="w-full px-3 py-2 bg-black-5 border border-black-10 rounded-lg text-sm
                  focus:outline-none focus:ring-2 focus:ring-green-100"
                autoComplete="off"
                aria-label={locale['filters.fromDate']}
              />
            </label>

            <label className="block text-xs text-black-60 mb-1" htmlFor="toDate">
              {locale['filters.toDate']}
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(event) => onFiltersChange({ ...filters, dateTo: event.target.value })}
                className="w-full px-3 py-2 bg-black-5 border border-black-10 rounded-lg text-sm
                  focus:outline-none focus:ring-2 focus:ring-green-100"
                autoComplete="off"
                aria-label={locale['filters.toDate']}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-black-50">{locale['filters.quickFilters']}</span>
            <button
              type="button"
              aria-label={locale['filters.approvedOnly']}
              onClick={() => onFiltersChange({ ...filters, approvedOnly: !filters.approvedOnly })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  filters.approvedOnly
                    ? 'bg-green-100 text-white'
                    : 'bg-black-5 text-black-70 hover:bg-black-10'
                }`}
            >
              {locale['filters.approvedOnly']}
            </button>
            <button
              type="button"
              aria-label={locale['filters.needsAttention']}
              onClick={() => onFiltersChange({ ...filters, sentiment: 'negative' })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  filters.sentiment === 'negative'
                    ? 'bg-cienna-100 text-white'
                    : 'bg-black-5 text-black-70 hover:bg-black-10'
                }`}
            >
              {locale['filters.needsAttention']}
            </button>
            <button
              type="button"
              aria-label={locale['filters.last30Days']}
              onClick={() => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                onFiltersChange({
                  ...filters,
                  dateFrom: thirtyDaysAgo.toISOString().split('T')[0]
                });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  filters.dateFrom
                    ? 'bg-blue-100 text-white'
                    : 'bg-black-5 text-black-70 hover:bg-black-10'
                }`}
            >
              {locale['filters.last30Days']}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                aria-label={locale['filters.clearAll']}
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-black-100 text-white hover:bg-black-80 transition-all ml-auto"
              >
                {locale['filters.clearAll']}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
