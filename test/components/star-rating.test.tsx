import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { StarRating } from '@/components/star-rating';

describe('StarRating component', () => {
  it('renders 5 stars', () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('applies filled class to stars up to rating', () => {
    const { container } = render(<StarRating rating={3} />);
    const filledStars = container.querySelectorAll('.fill-citrine-100');
    expect(filledStars).toHaveLength(3);
  });

  it('applies empty class to stars above rating', () => {
    const { container } = render(<StarRating rating={2} />);
    const emptyStars = container.querySelectorAll('.text-black-20');
    expect(emptyStars).toHaveLength(3);
  });

  it('renders with small size', () => {
    const { container } = render(<StarRating rating={5} size="sm" />);
    const smallStars = container.querySelectorAll('.w-4.h-4');
    expect(smallStars).toHaveLength(5);
  });

  it('renders with medium size by default', () => {
    const { container } = render(<StarRating rating={5} />);
    const mediumStars = container.querySelectorAll('.w-5.h-5');
    expect(mediumStars).toHaveLength(5);
  });

  it('renders with large size', () => {
    const { container } = render(<StarRating rating={5} size="lg" />);
    const largeStars = container.querySelectorAll('.w-6.h-6');
    expect(largeStars).toHaveLength(5);
  });

  it('handles zero rating', () => {
    const { container } = render(<StarRating rating={0} />);
    const emptyStars = container.querySelectorAll('.text-black-20');
    expect(emptyStars).toHaveLength(5);
  });

  it('handles full rating', () => {
    const { container } = render(<StarRating rating={5} />);
    const filledStars = container.querySelectorAll('.fill-citrine-100');
    expect(filledStars).toHaveLength(5);
  });
});
