import { NextResponse } from 'next/server';

import { getUniqueListings } from '@/data/mock-reviews';

/**
 * GET /api/reviews/hostaway/listings
 * Returns list of unique listings for filter dropdowns
 */
export async function GET() {
  try {
    const listings = getUniqueListings();

    return NextResponse.json({
      success: true,
      data: listings
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}
