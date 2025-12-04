import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LoadingSpinner } from '@/components/loading-spinner';

describe('LoadingSpinner', () => {
  it('renders without message', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with message', () => {
    render(<LoadingSpinner message="Loading reviews..." />);
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('does not render message element when message is undefined', () => {
    const { container } = render(<LoadingSpinner />);
    const heading = container.querySelector('h6');
    expect(heading).not.toBeInTheDocument();
  });

  it('applies spin animation class', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('animate-spin');
  });

  it('applies green color to spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('text-green-100');
  });

  it('centers content', () => {
    const { container } = render(<LoadingSpinner />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center');
  });
});
