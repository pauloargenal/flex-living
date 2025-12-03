import { promises as fs } from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';

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
    await writeApprovedIds(new Set(DEFAULT_APPROVED_IDS));
    return new Set(DEFAULT_APPROVED_IDS);
  }
}

/**
 * Write approved review IDs to file
 */
async function writeApprovedIds(ids: Set<number>): Promise<void> {
  const data = JSON.stringify(Array.from(ids), null, 2);
  await fs.writeFile(DATA_FILE, data, 'utf-8');
}

/**
 * GET /api/reviews/approve
 * Returns list of approved review IDs
 */
export async function GET() {
  const approvedIds = await readApprovedIds();
  return NextResponse.json({
    success: true,
    data: Array.from(approvedIds)
  });
}

/**
 * POST /api/reviews/approve
 * Toggles approval status for a review
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, approved } = body;

    if (typeof reviewId !== 'number') {
      return NextResponse.json({ success: false, error: 'Invalid review ID' }, { status: 400 });
    }

    const approvedIds = await readApprovedIds();

    if (approved) {
      approvedIds.add(reviewId);
    } else {
      approvedIds.delete(reviewId);
    }

    await writeApprovedIds(approvedIds);

    return NextResponse.json({
      success: true,
      data: {
        reviewId,
        approved,
        totalApproved: approvedIds.size
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update approval status' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/reviews/approve
 * Bulk update approval status
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewIds, approved } = body;

    if (!Array.isArray(reviewIds)) {
      return NextResponse.json(
        { success: false, error: 'Invalid review IDs array' },
        { status: 400 }
      );
    }

    const approvedIds = await readApprovedIds();

    reviewIds.forEach((id) => {
      if (approved) {
        approvedIds.add(id);
      } else {
        approvedIds.delete(id);
      }
    });

    await writeApprovedIds(approvedIds);

    return NextResponse.json({
      success: true,
      data: {
        updatedCount: reviewIds.length,
        totalApproved: approvedIds.size
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to bulk update approval status' },
      { status: 500 }
    );
  }
}
