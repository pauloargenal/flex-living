import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { PropertyReviewsWidget } from '@/app/properties/widgets/property-reviews-widget';
import { usePublicReviews } from '@/hooks/use-public-reviews';

// Mock hooks
vi.mock('@/hooks/use-public-reviews', () => ({
  usePublicReviews: vi.fn()
}));

describe('PropertyReviewsWidget component', () => {
  const mockLocale: Record<string, string> = {
    title: 'Guest Reviews',
    loading: 'Loading reviews...',
    'reviews.verifiedReviews': 'verified reviews',
    'reviews.averageRating': 'average rating',
    'reviews.review.text': 'reviews',
    basedOn: 'Based on verified guest reviews',
    'reviews.noReviews.title': 'No reviews yet',
    'reviews.noReviews.description': 'Be the first to leave a review!'
  };

  const mockReviews = [
    {
      id: 1,
      guestName: 'Alice Smith',
      rating: 9,
      review: 'Wonderful stay! The apartment was spotless.',
      date: 'Dec 1, 2024',
      listingName: 'Test Property',
      categories: [
        { category: 'cleanliness', rating: 10, displayName: 'Cleanliness' },
        { category: 'location', rating: 9, displayName: 'Location' }
      ]
    },
    {
      id: 2,
      guestName: 'Bob Johnson',
      rating: 8,
      review: 'Great location and amenities.',
      date: 'Nov 28, 2024',
      listingName: 'Test Property',
      categories: [{ category: 'cleanliness', rating: 8, displayName: 'Cleanliness' }]
    }
  ];

  const mockStats = {
    totalReviews: 25,
    averageRating: 8.7,
    categoryAverages: {
      Cleanliness: 9.2,
      Location: 8.8,
      Value: 8.5
    }
  };

  const defaultProps = {
    listingId: 'listing-1',
    locale: mockLocale
  };

  beforeEach(() => {
    vi.mocked(usePublicReviews).mockReturnValue({
      reviews: mockReviews,
      stats: mockStats,
      loading: false,
      error: null
    });
  });

  it('renders title', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Guest Reviews')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.mocked(usePublicReviews).mockReturnValue({
      reviews: [],
      stats: null,
      loading: true,
      error: null
    });

    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('renders total reviews count', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    const elements = screen.getAllByText(/25/);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders average rating', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('8.7')).toBeInTheDocument();
  });

  it('renders category averages', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Cleanliness')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('9.2')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders review cards', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Wonderful stay! The apartment was spotless.')).toBeInTheDocument();
    expect(screen.getByText('Great location and amenities.')).toBeInTheDocument();
  });

  it('renders review dates', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Dec 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('Nov 28, 2024')).toBeInTheDocument();
  });

  it('renders guest initials', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByText('BJ')).toBeInTheDocument();
  });

  it('renders category badges on review cards', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    const cleanlinessElements = screen.getAllByText('Cleanliness');
    expect(cleanlinessElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows empty state when no reviews', () => {
    vi.mocked(usePublicReviews).mockReturnValue({
      reviews: [],
      stats: null,
      loading: false,
      error: null
    });

    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
    expect(screen.getByText('Be the first to leave a review!')).toBeInTheDocument();
  });

  it('hides stats section when no stats available', () => {
    vi.mocked(usePublicReviews).mockReturnValue({
      reviews: [],
      stats: null,
      loading: false,
      error: null
    });

    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.queryByText('Based on verified guest reviews')).not.toBeInTheDocument();
  });

  it('calls usePublicReviews with correct listingId', () => {
    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(usePublicReviews).toHaveBeenCalledWith('listing-1');
  });

  it('handles reviews with no categories', () => {
    vi.mocked(usePublicReviews).mockReturnValue({
      reviews: [
        {
          id: 1,
          guestName: 'Test User',
          rating: 8,
          review: 'Good stay',
          date: 'Dec 1, 2024',
          listingName: 'Test Property',
          categories: []
        }
      ],
      stats: mockStats,
      loading: false,
      error: null
    });

    render(<PropertyReviewsWidget {...defaultProps} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Good stay')).toBeInTheDocument();
  });
});
