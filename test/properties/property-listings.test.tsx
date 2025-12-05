import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PropertyListings from '@/app/properties/widgets/property-listings';
import type { Listing } from '@/types/properties';

describe('PropertyListings component', () => {
  const mockListings: Listing[] = [
    { id: '1', name: 'Luxury Apartment Central London' },
    { id: '2', name: 'Cozy Studio Near Hyde Park' },
    { id: '3', name: 'Modern Flat in Shoreditch' }
  ];

  const mockProperties: Record<string, string> = {
    fromPerNight: 'From £{price}/night',
    excellent: 'Excellent'
  };

  const mockCommon: Record<string, string> = {
    viewDetails: 'View Details'
  };

  const mockPropertyImages: Record<string, string> = {
    '1': 'https://example.com/image1.jpg',
    '2': 'https://example.com/image2.jpg',
    '3': 'https://example.com/image3.jpg'
  };

  const mockPropertyDescriptions: Record<string, string> = {
    '1': 'A beautiful luxury apartment in the heart of London.',
    '2': 'A cozy studio perfect for solo travelers.',
    '3': 'A modern flat in the trendy Shoreditch area.'
  };

  const defaultProps = {
    listings: mockListings,
    properties: mockProperties,
    common: mockCommon,
    propertyImages: mockPropertyImages,
    propertyDescriptions: mockPropertyDescriptions
  };

  it('renders all property listings', () => {
    render(<PropertyListings {...defaultProps} />);

    expect(screen.getByText('Luxury Apartment Central London')).toBeInTheDocument();
    expect(screen.getByText('Cozy Studio Near Hyde Park')).toBeInTheDocument();
    expect(screen.getByText('Modern Flat in Shoreditch')).toBeInTheDocument();
  });

  it('renders property descriptions', () => {
    render(<PropertyListings {...defaultProps} />);

    expect(
      screen.getByText('A beautiful luxury apartment in the heart of London.')
    ).toBeInTheDocument();
    expect(screen.getByText('A cozy studio perfect for solo travelers.')).toBeInTheDocument();
  });

  it('renders price badge for each property', () => {
    render(<PropertyListings {...defaultProps} />);

    const priceBadges = screen.getAllByText('From £150/night');
    expect(priceBadges).toHaveLength(3);
  });

  it('renders view details link for each property', () => {
    render(<PropertyListings {...defaultProps} />);

    const viewDetailsLinks = screen.getAllByText('View Details');
    expect(viewDetailsLinks).toHaveLength(3);
  });

  it('renders links to property detail pages', () => {
    render(<PropertyListings {...defaultProps} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/properties/1');
    expect(links[1]).toHaveAttribute('href', '/properties/2');
    expect(links[2]).toHaveAttribute('href', '/properties/3');
  });

  it('renders property images with correct alt text', () => {
    render(<PropertyListings {...defaultProps} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Luxury Apartment Central London');
    expect(images[1]).toHaveAttribute('alt', 'Cozy Studio Near Hyde Park');
    expect(images[2]).toHaveAttribute('alt', 'Modern Flat in Shoreditch');
  });

  it('renders excellent rating label for each property', () => {
    render(<PropertyListings {...defaultProps} />);

    const excellentLabels = screen.getAllByText('Excellent');
    expect(excellentLabels).toHaveLength(3);
  });

  it('handles empty listings array', () => {
    render(<PropertyListings {...defaultProps} listings={[]} />);

    expect(screen.queryByText('Luxury Apartment Central London')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('handles missing property image gracefully', () => {
    const propsWithMissingImage = {
      ...defaultProps,
      propertyImages: { '1': 'https://example.com/image1.jpg' }
    };

    render(<PropertyListings {...propsWithMissingImage} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    const secondImgSrc = images[1].getAttribute('src');
    expect(secondImgSrc === '' || secondImgSrc === null).toBe(true);
  });

  it('handles missing property description gracefully', () => {
    const propsWithMissingDescription = {
      ...defaultProps,
      propertyDescriptions: { '1': 'Description for property 1' }
    };

    render(<PropertyListings {...propsWithMissingDescription} />);

    expect(screen.getByText('Description for property 1')).toBeInTheDocument();
  });
});
