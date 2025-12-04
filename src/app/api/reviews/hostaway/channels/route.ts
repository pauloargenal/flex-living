import { NextResponse } from 'next/server';

import { getUniqueChannels } from '@/data/mock-reviews';

/**
 * GET /api/reviews/hostaway/channels
 * Returns list of unique channels
 */
export async function GET() {
  const channelNames = getUniqueChannels();

  // Convert to channel objects with id and name
  const channels = channelNames.map((name) => ({
    id: name,
    name: name.charAt(0).toUpperCase() + name.slice(1)
  }));

  // Add Google as a channel option
  if (!channels.some((channel) => channel.id === 'google')) {
    channels.push({ id: 'google', name: 'Google' });
  }

  return NextResponse.json({
    success: true,
    data: channels
  });
}
