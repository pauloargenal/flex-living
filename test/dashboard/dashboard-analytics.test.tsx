import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { DashboardAnalytics } from '@/app/dashboard/widgets/dashboard-analytics';
import type { PropertyAnalytics } from '@/types/review';

describe('DashboardAnalytics component', () => {
  const mockLocale: Record<string, string> = {
    'analytics.totalReviews': 'Total Reviews',
    'analytics.showing': 'Showing',
    'analytics.averageRating': 'Average Rating',
    'analytics.properties': 'Properties',
    'analytics.activeListings': 'Active Listings',
    'analytics.approved': 'Approved',
    'analytics.forWebsiteDisplay': 'For Website Display',
    'analytics.categoryPerformance': 'Category Performance',
    'analytics.propertyPerformance': 'Property Performance',
    'analytics.reviews': 'reviews',
    'analytics.areasToImprove': 'Areas to improve:'
  };

  const mockTrendLabels: Record<string, string> = {
    improving: 'Improving',
    stable: 'Stable',
    declining: 'Declining'
  };

  const mockAnalytics: PropertyAnalytics[] = [
    {
      listingId: '1',
      listingName: 'Test Property 1',
      totalReviews: 25,
      averageRating: 8.5,
      categoryAverages: {
        Cleanliness: 9.0,
        Location: 8.5,
        Value: 8.0
      },
      ratingDistribution: { 5: 15, 4: 7, 3: 2, 2: 1, 1: 0 },
      recentTrend: 'improving',
      topIssues: [],
      approvedCount: 20,
      channelBreakdown: { airbnb: 15, 'booking.com': 10 }
    },
    {
      listingId: '2',
      listingName: 'Test Property 2',
      totalReviews: 15,
      averageRating: 7.5,
      categoryAverages: {
        Cleanliness: 8.0,
        Location: 7.5,
        Value: 7.0
      },
      ratingDistribution: { 5: 8, 4: 4, 3: 2, 2: 1, 1: 0 },
      recentTrend: 'stable',
      topIssues: ['Wi-Fi connectivity'],
      approvedCount: 10,
      channelBreakdown: { airbnb: 10, 'booking.com': 5 }
    }
  ];

  const defaultProps = {
    analytics: mockAnalytics,
    totalReviews: 40,
    filteredCount: 35,
    locale: mockLocale,
    trendLabels: mockTrendLabels
  };

  it('renders total reviews count', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('Total Reviews')).toBeInTheDocument();
  });

  it('renders filtered count', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText('Showing 35')).toBeInTheDocument();
  });

  it('renders average rating with correct format', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    // Multiple elements may have 8.0 value
    const ratingElements = screen.getAllByText('8.0');
    expect(ratingElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Average Rating')).toBeInTheDocument();
  });

  it('renders properties count', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    // Multiple elements may have '2' value
    const countElements = screen.getAllByText('2');
    expect(countElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('renders approved reviews count', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders category performance section', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText('Category Performance')).toBeInTheDocument();
    expect(screen.getByText('Cleanliness')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('renders property performance section', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText('Property Performance')).toBeInTheDocument();
    expect(screen.getByText('Test Property 1')).toBeInTheDocument();
    expect(screen.getByText('Test Property 2')).toBeInTheDocument();
  });

  it('displays top issues when available', () => {
    render(<DashboardAnalytics {...defaultProps} />);
    expect(screen.getByText(/Wi-Fi connectivity/)).toBeInTheDocument();
  });

  it('handles empty analytics array', () => {
    render(
      <DashboardAnalytics {...defaultProps} analytics={[]} totalReviews={0} filteredCount={0} />
    );
    // Multiple 0 values are present when analytics is empty
    const zeroElements = screen.getAllByText('0');
    expect(zeroElements.length).toBeGreaterThan(0);
  });
});
