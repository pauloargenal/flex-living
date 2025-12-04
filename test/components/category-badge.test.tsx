import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CategoryBadge } from '@/components/category-badge';

describe('CategoryBadge', () => {
  it('renders display name and rating', () => {
    render(<CategoryBadge displayName="Cleanliness" rating={8} />);
    expect(screen.getByText('Cleanliness: 8/10')).toBeInTheDocument();
  });

  it('applies green color for rating >= 8', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={8} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-green-10', 'text-green-100');
  });

  it('applies green color for rating > 8', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={10} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-green-10', 'text-green-100');
  });

  it('applies yellow color for rating >= 6 and < 8', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={7} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-citrine-10', 'text-hazel');
  });

  it('applies yellow color for rating = 6', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={6} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-citrine-10', 'text-hazel');
  });

  it('applies red color for rating < 6', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={5} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-cienna-10', 'text-cienna-100');
  });

  it('applies red color for low ratings', () => {
    const { container } = render(<CategoryBadge displayName="Test" rating={2} />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-cienna-10', 'text-cienna-100');
  });
});
