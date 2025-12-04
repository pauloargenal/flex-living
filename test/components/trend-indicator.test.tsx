import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TrendIndicator } from '@/components/trend-indicator';

const mockLabels = {
  'trends.improving': 'Improving',
  'trends.stable': 'Stable',
  'trends.declining': 'Declining'
};

describe('TrendIndicator component', () => {
  it('renders improving trend with correct label', () => {
    render(<TrendIndicator trend="improving" labels={mockLabels} />);
    expect(screen.getByText('Improving')).toBeInTheDocument();
  });

  it('renders stable trend with correct label', () => {
    render(<TrendIndicator trend="stable" labels={mockLabels} />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders declining trend with correct label', () => {
    render(<TrendIndicator trend="declining" labels={mockLabels} />);
    expect(screen.getByText('Declining')).toBeInTheDocument();
  });

  it('applies green color for improving trend', () => {
    const { container } = render(<TrendIndicator trend="improving" labels={mockLabels} />);
    const indicator = container.querySelector('span');
    expect(indicator).toHaveClass('text-green-100', 'bg-green-10');
  });

  it('applies yellow color for stable trend', () => {
    const { container } = render(<TrendIndicator trend="stable" labels={mockLabels} />);
    const indicator = container.querySelector('span');
    expect(indicator).toHaveClass('text-citrine-100', 'bg-citrine-10');
  });

  it('applies red color for declining trend', () => {
    const { container } = render(<TrendIndicator trend="declining" labels={mockLabels} />);
    const indicator = container.querySelector('span');
    expect(indicator).toHaveClass('text-cienna-100', 'bg-cienna-10');
  });

  it('renders with rounded-full class', () => {
    const { container } = render(<TrendIndicator trend="stable" labels={mockLabels} />);
    const indicator = container.querySelector('span');
    expect(indicator).toHaveClass('rounded-full');
  });
});
