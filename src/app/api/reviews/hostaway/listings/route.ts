import { NextResponse } from 'next/server';

import { getUniqueListings } from '@/data/mock-reviews';

/**
 * GET /api/reviews/hostaway/listings
 * Returns list of unique listings
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: getUniqueListings()
  });
}
