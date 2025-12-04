import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { BrandLogo } from '@/components/brand-logo';

describe('BrandLogo component', () => {
  const defaultProps = {
    brandName: 'Flex Living',
    brandShort: 'FL'
  };

  it('renders brand name', () => {
    render(<BrandLogo {...defaultProps} />);
    expect(screen.getByText('Flex Living')).toBeInTheDocument();
  });

  it('renders brand short name', () => {
    render(<BrandLogo {...defaultProps} />);
    expect(screen.getByText('FL')).toBeInTheDocument();
  });

  it('renders as link to home', () => {
    render(<BrandLogo {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
