import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { DashboardLayout } from '@/app/dashboard/dashboard-layout';
import { useFetchReviews } from '@/hooks/use-fetch-reviews';

// Mock the hooks
vi.mock('@/hooks/use-fetch-reviews', () => ({
  useFetchReviews: vi.fn()
}));

// Mock lucide-react icons
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    ClockIcon: () => <span data-testid="clock-icon" />,
    RefreshCcwIcon: () => <span data-testid="refresh-icon" />,
    SearchIcon: () => <span data-testid="search-icon" />
  };
});

describe('DashboardLayout component', () => {
  const mockLocale: Record<string, string> = {
    pageTitle: 'Reviews Dashboard',
    pageDescription: 'Manage and analyze guest reviews',
    'tab.reviews': 'Reviews',
    'tab.analytics': 'Analytics',
    'common.error': 'Something went wrong',
    tryAgain: 'Try Again',
    loading: 'Loading reviews...',
    'noReviews.title': 'No reviews found',
    'noReviews.description': 'Try adjusting your filters',
    dataRefreshed: 'Data refreshed',
    refresh: 'Refresh',
    'filters.searchPlaceholder': 'Search reviews...',
    'filters.title': 'Filters',
    'filters.sortBy': 'Sort by',
    'filters.sortByDate': 'Date',
    'filters.sortByRating': 'Rating',
    'filters.sortByGuest': 'Guest',
    'filters.sortByProperty': 'Property',
    'filters.noOptions': 'No options',
    'analytics.totalReviews': 'Total Reviews',
    'analytics.showing': 'Showing',
    'analytics.averageRating': 'Average Rating',
    'analytics.properties': 'Properties',
    'analytics.activeListings': 'Active Listings',
    'analytics.approved': 'Approved',
    'analytics.forWebsiteDisplay': 'For Website',
    'analytics.categoryPerformance': 'Category Performance',
    'analytics.propertyPerformance': 'Property Performance',
    'analytics.reviews': 'reviews',
    'analytics.areasToImprove': 'Areas to improve:'
  };

  const mockSentimentLabels: Record<string, string> = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative'
  };

  const mockTrendsLocale: Record<string, string> = {
    improving: 'Improving',
    stable: 'Stable',
    declining: 'Declining'
  };

  const mockRatingsLocale: Record<string, string> = {
    '5.stars': '5 Stars',
    '4.stars': '4 Stars',
    '3.stars': '3 Stars',
    '2.stars': '2 Stars',
    '1.stars': '1 Star'
  };

  const defaultProps = {
    locale: mockLocale,
    sentimentLabels: mockSentimentLabels,
    trendsLocale: mockTrendsLocale,
    ratingsLocale: mockRatingsLocale
  };

  const mockReviews = [
    {
      id: 1,
      type: 'guest-to-host' as const,
      status: 'published' as const,
      overallRating: 9,
      averageRating: 8.5,
      publicReview: 'Great stay!',
      categories: [],
      submittedAt: new Date('2024-01-15'),
      formattedDate: 'Jan 15, 2024',
      guestName: 'John Doe',
      listingName: 'Test Property',
      listingId: '1',
      channel: 'airbnb',
      channelIcon: '🏠',
      isApprovedForWebsite: false,
      sentiment: 'positive' as const
    }
  ];

  const mockUseFetchReviews = {
    reviews: mockReviews,
    analytics: [],
    listings: [],
    channels: [],
    loading: false,
    error: null,
    meta: { total: 1, filtered: 1, page: 1, pageSize: 20 },
    filters: {},
    sort: { field: 'date' as const, direction: 'desc' as const },
    selectedReviews: new Set<number>(),
    setFilters: vi.fn(),
    setSort: vi.fn(),
    handleApprovalToggle: vi.fn(),
    handleSelectReview: vi.fn(),
    handleBulkApprove: vi.fn(),
    refetch: vi.fn()
  };

  beforeEach(() => {
    vi.mocked(useFetchReviews).mockReturnValue(mockUseFetchReviews);
  });

  it('renders page title and description', () => {
    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('Reviews Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Manage and analyze guest reviews')).toBeInTheDocument();
  });

  it('renders reviews and analytics tabs', () => {
    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('shows reviews tab as active by default', () => {
    render(<DashboardLayout {...defaultProps} />);
    const reviewsTab = screen.getByRole('button', { name: 'Reviews' });
    expect(reviewsTab).toHaveClass('bg-white');
  });

  it('switches to analytics tab when clicked', () => {
    render(<DashboardLayout {...defaultProps} />);

    const analyticsTab = screen.getByRole('button', { name: 'Analytics' });
    fireEvent.click(analyticsTab);

    expect(analyticsTab).toHaveClass('bg-white');
  });

  it('shows loading spinner when loading', () => {
    vi.mocked(useFetchReviews).mockReturnValue({
      ...mockUseFetchReviews,
      loading: true
    });

    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('shows error message when error occurs', () => {
    vi.mocked(useFetchReviews).mockReturnValue({
      ...mockUseFetchReviews,
      error: 'Failed to fetch reviews'
    });

    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('calls refetch when try again is clicked', () => {
    const refetch = vi.fn();
    vi.mocked(useFetchReviews).mockReturnValue({
      ...mockUseFetchReviews,
      error: 'Failed to fetch reviews',
      refetch
    });

    render(<DashboardLayout {...defaultProps} />);
    fireEvent.click(screen.getByText('Try Again'));

    expect(refetch).toHaveBeenCalled();
  });

  it('shows empty state when no reviews', () => {
    vi.mocked(useFetchReviews).mockReturnValue({
      ...mockUseFetchReviews,
      reviews: []
    });

    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('No reviews found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('renders review cards when reviews are available', () => {
    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Property')).toBeInTheDocument();
  });

  it('renders refresh button', () => {
    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  it('calls refetch when refresh button is clicked', () => {
    const refetch = vi.fn();
    vi.mocked(useFetchReviews).mockReturnValue({
      ...mockUseFetchReviews,
      refetch
    });

    render(<DashboardLayout {...defaultProps} />);
    fireEvent.click(screen.getByText('Refresh'));

    expect(refetch).toHaveBeenCalled();
  });

  it('shows data refreshed time', () => {
    render(<DashboardLayout {...defaultProps} />);
    expect(screen.getByText(/Data refreshed/)).toBeInTheDocument();
  });
});
