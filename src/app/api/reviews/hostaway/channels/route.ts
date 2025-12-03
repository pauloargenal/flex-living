import { NextResponse } from 'next/server';

import { getUniqueChannels } from '@/data/mock-reviews';

export async function GET() {
  try {
    const channels = getUniqueChannels();

    return NextResponse.json({
      success: true,
      data: channels.map((channel) => ({
        id: channel,
        name: channel.charAt(0).toUpperCase() + channel.slice(1)
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch channels' },
      { status: 500 }
    );
  }
}
