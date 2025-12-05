import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PropertyGalleryWidget } from '@/app/properties/[id]/widgets/property-gallery-widget';

describe('PropertyGalleryWidget component', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];

  const defaultProps = {
    images: mockImages,
    propertyName: 'Luxury Apartment Central London'
  };

  it('renders main image', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const mainImage = screen.getAllByRole('img')[0];
    expect(mainImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(mainImage).toHaveAttribute('alt', 'Luxury Apartment Central London');
  });

  it('renders thumbnail images', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });

  it('shows first image as selected by default', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const thumbnailButtons = screen.getAllByRole('button');
    expect(thumbnailButtons[0]).toHaveClass('border-green-100');
  });

  it('changes main image when thumbnail is clicked', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const thumbnailButtons = screen.getAllByRole('button');
    fireEvent.click(thumbnailButtons[1]);

    const mainImage = screen.getAllByRole('img')[0];
    expect(mainImage).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });

  it('updates selected thumbnail styling when clicked', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const thumbnailButtons = screen.getAllByRole('button');
    fireEvent.click(thumbnailButtons[1]);

    expect(thumbnailButtons[1]).toHaveClass('border-green-100');
    expect(thumbnailButtons[0]).not.toHaveClass('border-green-100');
  });

  it('handles single image', () => {
    render(
      <PropertyGalleryWidget images={['https://example.com/single.jpg']} propertyName="Test" />
    );

    const images = screen.getAllByRole('img');
    // Main image plus thumbnail (sliced to 2, but only 1 available = 1 thumbnail)
    expect(images.length).toBe(2);
  });

  it('renders thumbnail images with correct alt text', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'Luxury Apartment Central London');
    });
  });

  it('limits thumbnails to first 2 images', () => {
    const manyImages = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ];

    render(<PropertyGalleryWidget images={manyImages} propertyName="Test" />);

    const thumbnailButtons = screen.getAllByRole('button');
    // Only 2 thumbnail buttons
    expect(thumbnailButtons.length).toBe(2);
  });

  it('maintains selected state correctly', () => {
    render(<PropertyGalleryWidget {...defaultProps} />);

    const thumbnailButtons = screen.getAllByRole('button');

    // Click second thumbnail
    fireEvent.click(thumbnailButtons[1]);
    expect(thumbnailButtons[1]).toHaveClass('border-green-100');

    // Click first thumbnail again
    fireEvent.click(thumbnailButtons[0]);
    expect(thumbnailButtons[0]).toHaveClass('border-green-100');
    expect(thumbnailButtons[1]).not.toHaveClass('border-green-100');
  });
});
