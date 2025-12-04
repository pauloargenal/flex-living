import { NextRequest, NextResponse } from 'next/server';

import { GoogleReview, GooglePlaceDetails } from '@/types/review';
import { normalizeGoogleReviews } from '@/utils/review-normalizer';
import { mockGoogleReviews } from '@/data/mock-google-reviews';

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API || '';
const GOOGLE_PLACES_API_URL = process.env.GOOGLE_PLACES_API_URL || '';

/**
 * Fetches reviews from Google Places API
 */
async function fetchGoogleReviews(placeId: string): Promise<GoogleReview[]> {
  if (!GOOGLE_PLACES_API_KEY) {
    return mockGoogleReviews;
  }

  try {
    const response = await fetch(
      `${GOOGLE_PLACES_API_URL}/${placeId}?fields=id,displayName,rating,userRatingCount,reviews`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      return mockGoogleReviews;
    }

    const data: GooglePlaceDetails = await response.json();
    return data.reviews || mockGoogleReviews;
  } catch {
    return mockGoogleReviews;
  }
}

/**
 * GET /api/reviews/google
 * Fetches Google reviews for a property
 *
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const placeId = searchParams.get('placeId');
    const listingName = searchParams.get('listingName') || 'Property';

    // Fetch reviews (uses mock if no API key or placeId)
    const googleReviews = placeId ? await fetchGoogleReviews(placeId) : mockGoogleReviews;

    // Normalize to match our review format
    const normalizedReviews = normalizeGoogleReviews(googleReviews, listingName);

    return NextResponse.json({
      success: true,
      data: normalizedReviews,
      meta: {
        total: normalizedReviews.length,
        source: placeId && GOOGLE_PLACES_API_KEY ? 'google' : 'mock',
        placeId
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Google reviews' },
      { status: 500 }
    );
  }
}
