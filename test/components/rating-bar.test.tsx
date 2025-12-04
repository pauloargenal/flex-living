import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { RatingBar } from '@/components/rating-bar';

describe('RatingBar component', () => {
  it('renders with correct percentage width', () => {
    const { container } = render(<RatingBar rating={5} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveStyle({ width: '50%' });
  });

  it('renders full width for max rating', () => {
    const { container } = render(<RatingBar rating={10} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveStyle({ width: '100%' });
  });

  it('renders zero width for zero rating', () => {
    const { container } = render(<RatingBar rating={0} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveStyle({ width: '0%' });
  });

  it('uses custom max rating', () => {
    const { container } = render(<RatingBar rating={2} maxRating={5} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveStyle({ width: '40%' });
  });

  it('applies green color for rating >= 8', () => {
    const { container } = render(<RatingBar rating={8} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveClass('bg-green-100');
  });

  it('applies yellow color for rating >= 6 and < 8', () => {
    const { container } = render(<RatingBar rating={7} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveClass('bg-citrine-100');
  });

  it('applies red color for rating < 6', () => {
    const { container } = render(<RatingBar rating={4} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveClass('bg-cienna-100');
  });

  it('has transition class for animation', () => {
    const { container } = render(<RatingBar rating={5} />);
    const bar = container.querySelector('[style*="width"]');
    expect(bar).toHaveClass('transition-all', 'duration-500');
  });
});
