import { promises as fs } from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

import { mockHostawayReviews } from '@/data/mock-reviews';
import { normalizeReviews, filterReviews, sortReviews } from '@/utils/review-normalizer';

// Path to the JSON file that stores approved review IDs
const DATA_FILE = path.join(process.cwd(), 'src/data/approved-reviews.json');

// Default approved review IDs (used when file doesn't exist)
const DEFAULT_APPROVED_IDS = [
  // Original properties
  7453, 7455, 7457, 7458, 7460, 7461, 7463, 7466, 7467, 7468, 7469, 7472, 7474, 7478,
  // Riverside Apartment - Southbank
  7479, 7480,
  // Modern Flat - Kings Cross
  7481,
  // Victorian Townhouse - Notting Hill
  7483, 7484,
  // Art Deco Suite - Marylebone
  7485,
  // Docklands Executive Apartment
  7487,
  // Chelsea Garden Apartment
  7489, 7490,
  // Clerkenwell Warehouse Conversion
  7491,
  // Hampstead Heath Retreat
  7493, 7494,
  // Brixton Creative Studio
  7495,
  // Tower Bridge Luxury Flat
  7497, 7498
];

/**
 * Read approved review IDs from file
 */
async function readApprovedIds(): Promise<Set<number>> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const ids = JSON.parse(data);
    return new Set<number>(ids);
  } catch {
    // File doesn't exist, return defaults
    return new Set(DEFAULT_APPROVED_IDS);
  }
}

/**
 * GET /api/reviews/public
 * Returns approved reviews for public property pages
 * Only returns guest-to-host reviews that are approved for website display
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const listingId = searchParams.get('listingId');

    // Read approved IDs from file
    const approvedReviewIds = await readApprovedIds();

    // Normalize all reviews
    const normalizedReviews = normalizeReviews(mockHostawayReviews, approvedReviewIds);

    // Filter to only approved guest-to-host reviews
    let publicReviews = filterReviews(normalizedReviews, {
      type: 'guest-to-host',
      approvedOnly: true,
      listingId: listingId || undefined
    });

    // Sort by date descending (newest first)
    publicReviews = sortReviews(publicReviews, {
      field: 'date',
      direction: 'desc'
    });

    // Calculate aggregate stats for display
    const totalReviews = publicReviews.length;
    const averageRating =
      totalReviews > 0
        ? publicReviews.reduce((sum, review) => sum + (review.overallRating || 0), 0) / totalReviews
        : 0;

    // Calculate category averages
    const categoryTotals: Record<string, { sum: number; count: number }> = {};
    publicReviews.forEach((review) => {
      review.categories.forEach((cat) => {
        if (!categoryTotals[cat.displayName]) {
          categoryTotals[cat.displayName] = { sum: 0, count: 0 };
        }
        categoryTotals[cat.displayName].sum += cat.rating;
        categoryTotals[cat.displayName].count += 1;
      });
    });

    const categoryAverages: Record<string, number> = {};
    Object.entries(categoryTotals).forEach(([category, { sum, count }]) => {
      categoryAverages[category] = Math.round((sum / count) * 10) / 10;
    });

    return NextResponse.json({
      success: true,
      data: {
        reviews: publicReviews.map((review) => ({
          id: review.id,
          guestName: review.guestName,
          rating: review.overallRating,
          review: review.publicReview,
          date: review.formattedDate,
          listingName: review.listingName,
          categories: review.categories
        })),
        stats: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          categoryAverages
        }
      }
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
