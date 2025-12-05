import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DashboardFilterBar } from '@/app/dashboard/widgets/dashboard-filter-bar';
import type { ReviewFilters, SortOptions, Listing, Channel } from '@/types/review';

describe('DashboardFilterBar component', () => {
  const mockLocale: Record<string, string> = {
    'filters.searchPlaceholder': 'Search reviews...',
    'filters.title': 'Filters',
    'filters.active': 'Active',
    'filters.sortBy': 'Sort by',
    'filters.sortByDate': 'Date',
    'filters.sortByRating': 'Rating',
    'filters.sortByGuest': 'Guest Name',
    'filters.sortByProperty': 'Property',
    'filters.property': 'Property',
    'filters.allProperties': 'All Properties',
    'filters.channel': 'Channel',
    'filters.allChannels': 'All Channels',
    'filters.rating': 'Rating',
    'filters.allRatings': 'All Ratings',
    'filters.sentiment': 'Sentiment',
    'filters.allSentiments': 'All Sentiments',
    'filters.fromDate': 'From Date',
    'filters.toDate': 'To Date',
    'filters.quickFilters': 'Quick Filters:',
    'filters.approvedOnly': 'Approved Only',
    'filters.needsAttention': 'Needs Attention',
    'filters.last30Days': 'Last 30 Days',
    'filters.clearAll': 'Clear All',
    'filters.selected': 'selected',
    'filters.approveAll': 'Approve All',
    'filters.unapproveAll': 'Unapprove All',
    'filters.noOptions': 'No options'
  };

  const mockRatingsLocale: Record<string, string> = {
    '5.stars': '5 Stars',
    '4.stars': '4 Stars',
    '3.stars': '3 Stars',
    '2.stars': '2 Stars',
    '1.stars': '1 Star'
  };

  const mockListings: Listing[] = [
    { id: '1', name: 'Property A' },
    { id: '2', name: 'Property B' }
  ];

  const mockChannels: Channel[] = [
    { id: 'airbnb', name: 'Airbnb' },
    { id: 'booking', name: 'Booking.com' }
  ];

  const mockFilters: ReviewFilters = {};
  const mockSort: SortOptions = { field: 'date', direction: 'desc' };

  const defaultProps = {
    listings: mockListings,
    channels: mockChannels,
    filters: mockFilters,
    sort: mockSort,
    onFiltersChange: vi.fn(),
    onSortChange: vi.fn(),
    selectedCount: 0,
    onBulkApprove: vi.fn(),
    locale: mockLocale,
    ratingsLocale: mockRatingsLocale
  };

  it('renders search input', () => {
    render(<DashboardFilterBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search reviews...')).toBeInTheDocument();
  });

  it('renders filter button', () => {
    render(<DashboardFilterBar {...defaultProps} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('calls onFiltersChange when search query changes', () => {
    const onFiltersChange = vi.fn();
    render(<DashboardFilterBar {...defaultProps} onFiltersChange={onFiltersChange} />);

    const searchInput = screen.getByPlaceholderText('Search reviews...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(onFiltersChange).toHaveBeenCalledWith({ searchQuery: 'test query' });
  });

  it('toggles filter panel when filter button is clicked', () => {
    render(<DashboardFilterBar {...defaultProps} />);

    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);

    expect(screen.getByText('Quick Filters:')).toBeInTheDocument();
    expect(screen.getByText('Approved Only')).toBeInTheDocument();
    expect(screen.getByText('Needs Attention')).toBeInTheDocument();
  });

  it('shows bulk action buttons when reviews are selected', () => {
    render(<DashboardFilterBar {...defaultProps} selectedCount={3} />);

    expect(screen.getByText('3 selected')).toBeInTheDocument();
    expect(screen.getByText('Approve All')).toBeInTheDocument();
    expect(screen.getByText('Unapprove All')).toBeInTheDocument();
  });

  it('calls onBulkApprove with true when Approve All is clicked', () => {
    const onBulkApprove = vi.fn();
    render(
      <DashboardFilterBar {...defaultProps} selectedCount={3} onBulkApprove={onBulkApprove} />
    );

    fireEvent.click(screen.getByText('Approve All'));
    expect(onBulkApprove).toHaveBeenCalledWith(true);
  });

  it('calls onBulkApprove with false when Unapprove All is clicked', () => {
    const onBulkApprove = vi.fn();
    render(
      <DashboardFilterBar {...defaultProps} selectedCount={3} onBulkApprove={onBulkApprove} />
    );

    fireEvent.click(screen.getByText('Unapprove All'));
    expect(onBulkApprove).toHaveBeenCalledWith(false);
  });

  it('shows clear all button when filters are active', () => {
    render(<DashboardFilterBar {...defaultProps} filters={{ searchQuery: 'test' }} />);

    fireEvent.click(screen.getByText('Filters'));
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('calls onFiltersChange with empty object when clear all is clicked', () => {
    const onFiltersChange = vi.fn();
    render(
      <DashboardFilterBar
        {...defaultProps}
        filters={{ searchQuery: 'test' }}
        onFiltersChange={onFiltersChange}
      />
    );

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Clear All'));

    expect(onFiltersChange).toHaveBeenCalledWith({});
  });

  it('applies approved only filter when quick filter is clicked', () => {
    const onFiltersChange = vi.fn();
    render(<DashboardFilterBar {...defaultProps} onFiltersChange={onFiltersChange} />);

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByLabelText('Approved Only'));

    expect(onFiltersChange).toHaveBeenCalledWith({ approvedOnly: true });
  });

  it('applies negative sentiment filter when needs attention is clicked', () => {
    const onFiltersChange = vi.fn();
    render(<DashboardFilterBar {...defaultProps} onFiltersChange={onFiltersChange} />);

    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByLabelText('Needs Attention'));

    expect(onFiltersChange).toHaveBeenCalledWith({ sentiment: 'negative' });
  });
});
