import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { PropertyBookingWidget } from '@/app/properties/[id]/widgets/property-booking-widget';

describe('PropertyBookingWidget component', () => {
  const mockLocale: Record<string, string> = {
    perNight: '/ night',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    'guestOptions.one': '1 Guest',
    'guestOptions.two': '2 Guests',
    'guestOptions.three': '3 Guests',
    'guestOptions.four': '4 Guests',
    reserveNow: 'Reserve Now',
    freeCancellation: 'Free cancellation within 24 hours',
    nights: 'x {nights} nights',
    cleaningFee: 'Cleaning fee',
    cleaningFeeValue: '£45',
    serviceFee: 'Service fee',
    serviceFeeValue: '£40',
    total: 'Total',
    'booknow.title': 'Confirm Booking',
    'booknow.description': 'Please confirm your booking details',
    'booknow.confirm': 'Confirm',
    'booknow.cancel': 'Cancel',
    'booknow.success': 'Booking confirmed!',
    'booknow.error': 'Please fill in all fields'
  };

  const defaultProps = {
    price: '£150',
    locale: mockLocale
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders price per night', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('£150')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
  });

  it('renders check-in date input', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Check-in')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { hidden: true }) || screen.getByLabelText('Check-in')
    ).toBeInTheDocument();
  });

  it('renders check-out date input', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Check-out')).toBeInTheDocument();
  });

  it('renders guests dropdown', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Guests')).toBeInTheDocument();
  });

  it('renders reserve now button', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Reserve Now')).toBeInTheDocument();
  });

  it('renders free cancellation notice', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Free cancellation within 24 hours')).toBeInTheDocument();
  });

  it('renders price breakdown', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    expect(screen.getByText('Cleaning fee')).toBeInTheDocument();
    expect(screen.getByText('£45')).toBeInTheDocument();
    expect(screen.getByText('Service fee')).toBeInTheDocument();
    expect(screen.getByText('£40')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders nights calculation', () => {
    render(<PropertyBookingWidget {...defaultProps} />);
    // The nights text is "{price} x 3 nights"
    expect(screen.getByText(/x 3 nights/)).toBeInTheDocument();
  });

  it('updates check-in date when changed', () => {
    render(<PropertyBookingWidget {...defaultProps} />);

    const checkInInput = screen.getByLabelText('Check-in');
    fireEvent.change(checkInInput, { target: { value: '2024-12-20' } });

    expect(checkInInput).toHaveValue('2024-12-20');
  });

  it('updates check-out date when changed', () => {
    render(<PropertyBookingWidget {...defaultProps} />);

    const checkOutInput = screen.getByLabelText('Check-out');
    fireEvent.change(checkOutInput, { target: { value: '2024-12-25' } });

    expect(checkOutInput).toHaveValue('2024-12-25');
  });

  it('opens modal when reserve now is clicked', () => {
    render(<PropertyBookingWidget {...defaultProps} />);

    fireEvent.click(screen.getByText('Reserve Now'));

    expect(screen.getByText('Confirm Booking')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your booking details')).toBeInTheDocument();
  });

  it('shows confirm and cancel buttons in modal', () => {
    render(<PropertyBookingWidget {...defaultProps} />);

    fireEvent.click(screen.getByText('Reserve Now'));

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('closes modal when cancel is clicked', () => {
    render(<PropertyBookingWidget {...defaultProps} />);

    fireEvent.click(screen.getByText('Reserve Now'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Confirm Booking')).not.toBeInTheDocument();
  });

  it('shows error snackbar when confirming without all fields', async () => {
    vi.useRealTimers();
    render(<PropertyBookingWidget {...defaultProps} />);

    fireEvent.click(screen.getByText('Reserve Now'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });
  });

  it('shows success snackbar when confirming with all fields filled', async () => {
    vi.useRealTimers();
    render(<PropertyBookingWidget {...defaultProps} />);

    // Fill in check-in
    const checkInInput = screen.getByLabelText('Check-in');
    fireEvent.change(checkInInput, { target: { value: '2024-12-20' } });

    // Fill in check-out
    const checkOutInput = screen.getByLabelText('Check-out');
    fireEvent.change(checkOutInput, { target: { value: '2024-12-25' } });

    // Open modal and confirm
    fireEvent.click(screen.getByText('Reserve Now'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByText('Booking confirmed!')).toBeInTheDocument();
    });
  });

  it('clears form after successful booking', async () => {
    vi.useRealTimers();
    render(<PropertyBookingWidget {...defaultProps} />);

    // Fill in check-in
    const checkInInput = screen.getByLabelText('Check-in');
    fireEvent.change(checkInInput, { target: { value: '2024-12-20' } });

    // Fill in check-out
    const checkOutInput = screen.getByLabelText('Check-out');
    fireEvent.change(checkOutInput, { target: { value: '2024-12-25' } });

    // Open modal and confirm
    fireEvent.click(screen.getByText('Reserve Now'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(checkInInput).toHaveValue('');
      expect(checkOutInput).toHaveValue('');
    });
  });

  it('closes modal after confirm', async () => {
    vi.useRealTimers();
    render(<PropertyBookingWidget {...defaultProps} />);

    fireEvent.click(screen.getByText('Reserve Now'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.queryByText('Please confirm your booking details')).not.toBeInTheDocument();
    });
  });
});
