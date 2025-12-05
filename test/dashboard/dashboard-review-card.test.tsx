import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DashboardReviewCard } from '@/app/dashboard/widgets/dashboard-review-card';
import type { NormalizedReview } from '@/types/review';

describe('DashboardReviewCard component', () => {
  const mockLocale: Record<string, string> = {
    'reviewCard.approved': 'Approved',
    'reviewCard.approveForWebsite': 'Approve for Website',
    'reviewCard.id': 'ID',
    'reviewCard.select': 'Select review',
    'reviewCard.noReviewText': 'No review text available'
  };

  const mockSentimentLocale: Record<string, string> = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative'
  };

  const mockReview: NormalizedReview = {
    id: 1,
    type: 'guest-to-host',
    status: 'published',
    overallRating: 9,
    averageRating: 8.5,
    publicReview: 'Excellent stay! The apartment was clean and well-located.',
    categories: [
      { category: 'cleanliness', rating: 9, displayName: 'Cleanliness' },
      { category: 'location', rating: 10, displayName: 'Location' }
    ],
    submittedAt: new Date('2024-01-15'),
    formattedDate: 'Jan 15, 2024',
    guestName: 'John Doe',
    listingName: 'Luxury Apartment Central London',
    listingId: 'listing-1',
    channel: 'airbnb',
    channelIcon: '🏠',
    isApprovedForWebsite: false,
    sentiment: 'positive'
  };

  const defaultProps = {
    review: mockReview,
    onApprovalToggle: vi.fn(),
    locale: mockLocale,
    sentimentLocale: mockSentimentLocale
  };

  it('renders guest name', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders listing name', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('Luxury Apartment Central London')).toBeInTheDocument();
  });

  it('renders review text', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(
      screen.getByText('Excellent stay! The apartment was clean and well-located.')
    ).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders channel badge', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText(/airbnb/i)).toBeInTheDocument();
  });

  it('renders overall rating', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('renders sentiment label', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('Positive')).toBeInTheDocument();
  });

  it('renders category badges', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('Cleanliness: 9/10')).toBeInTheDocument();
    expect(screen.getByText('Location: 10/10')).toBeInTheDocument();
  });

  it('renders approve button when not approved', () => {
    render(<DashboardReviewCard {...defaultProps} />);
    expect(screen.getByText('Approve for Website')).toBeInTheDocument();
  });

  it('renders approved button when approved', () => {
    const approvedReview = { ...mockReview, isApprovedForWebsite: true };
    render(<DashboardReviewCard {...defaultProps} review={approvedReview} />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('calls onApprovalToggle when approve button is clicked', () => {
    const onApprovalToggle = vi.fn();
    render(<DashboardReviewCard {...defaultProps} onApprovalToggle={onApprovalToggle} />);

    fireEvent.click(screen.getByText('Approve for Website'));
    expect(onApprovalToggle).toHaveBeenCalledWith(1, true);
  });

  it('calls onApprovalToggle with false when unapproving', () => {
    const onApprovalToggle = vi.fn();
    const approvedReview = { ...mockReview, isApprovedForWebsite: true };
    render(
      <DashboardReviewCard
        {...defaultProps}
        review={approvedReview}
        onApprovalToggle={onApprovalToggle}
      />
    );

    fireEvent.click(screen.getByText('Approved'));
    expect(onApprovalToggle).toHaveBeenCalledWith(1, false);
  });

  it('renders checkbox when onSelect is provided', () => {
    const onSelect = vi.fn();
    render(<DashboardReviewCard {...defaultProps} onSelect={onSelect} selected={false} />);

    expect(screen.getByLabelText('Select review')).toBeInTheDocument();
  });

  it('calls onSelect when checkbox is clicked', () => {
    const onSelect = vi.fn();
    render(<DashboardReviewCard {...defaultProps} onSelect={onSelect} selected={false} />);

    fireEvent.click(screen.getByLabelText('Select review'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('renders neutral sentiment correctly', () => {
    const neutralReview = { ...mockReview, sentiment: 'neutral' as const };
    render(<DashboardReviewCard {...defaultProps} review={neutralReview} />);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('renders negative sentiment correctly', () => {
    const negativeReview = { ...mockReview, sentiment: 'negative' as const };
    render(<DashboardReviewCard {...defaultProps} review={negativeReview} />);
    expect(screen.getByText('Negative')).toBeInTheDocument();
  });

  it('shows no review text message when publicReview is null', () => {
    const reviewWithoutText = { ...mockReview, publicReview: null as unknown as string };
    render(<DashboardReviewCard {...defaultProps} review={reviewWithoutText} />);
    expect(screen.getByText('No review text available')).toBeInTheDocument();
  });

  it('limits displayed categories to 5', () => {
    const reviewWithManyCategories: NormalizedReview = {
      ...mockReview,
      categories: [
        { category: 'cat1', rating: 9, displayName: 'Category 1' },
        { category: 'cat2', rating: 9, displayName: 'Category 2' },
        { category: 'cat3', rating: 9, displayName: 'Category 3' },
        { category: 'cat4', rating: 9, displayName: 'Category 4' },
        { category: 'cat5', rating: 9, displayName: 'Category 5' },
        { category: 'cat6', rating: 9, displayName: 'Category 6' }
      ]
    };
    render(<DashboardReviewCard {...defaultProps} review={reviewWithManyCategories} />);

    expect(screen.getByText('Category 1: 9/10')).toBeInTheDocument();
    expect(screen.getByText('Category 5: 9/10')).toBeInTheDocument();
    expect(screen.queryByText('Category 6: 9/10')).not.toBeInTheDocument();
  });
});
