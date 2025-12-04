import type {
  NormalizedReview,
  PropertyAnalytics,
  ReviewFilters,
  SortOptions,
  ReviewsApiResponse,
  Listing,
  Channel,
  PublicReview,
  ReviewStats
} from '@/types/review';

export interface GoogleReviewsResponse {
  success: boolean;
  data: NormalizedReview[];
  meta: {
    total: number;
    source: string;
    placeId?: string;
  };
}

export interface FetchReviewsParams {
  filters?: ReviewFilters;
  sort?: SortOptions;
  page?: number;
  pageSize?: number;
}

export interface FetchReviewsResponse {
  reviews: NormalizedReview[];
  analytics: PropertyAnalytics[];
  meta: {
    total: number;
    filtered: number;
    page: number;
    pageSize: number;
  };
}

export async function fetchReviews(params: FetchReviewsParams): Promise<FetchReviewsResponse> {
  const {
    filters = {},
    sort = { field: 'date', direction: 'desc' },
    page = 1,
    pageSize = 50
  } = params;

  const searchParams = new URLSearchParams();

  if (filters.listingId) {
    searchParams.set('listingId', filters.listingId);
  }
  if (filters.channel) {
    searchParams.set('channel', filters.channel);
  }
  if (filters.type) {
    searchParams.set('type', filters.type);
  }
  if (filters.status) {
    searchParams.set('status', filters.status);
  }
  if (filters.minRating) {
    searchParams.set('minRating', filters.minRating.toString());
  }
  if (filters.maxRating) {
    searchParams.set('maxRating', filters.maxRating.toString());
  }
  if (filters.dateFrom) {
    searchParams.set('dateFrom', filters.dateFrom);
  }
  if (filters.dateTo) {
    searchParams.set('dateTo', filters.dateTo);
  }
  if (filters.sentiment) {
    searchParams.set('sentiment', filters.sentiment);
  }
  if (filters.searchQuery) {
    searchParams.set('search', filters.searchQuery);
  }
  if (filters.approvedOnly) {
    searchParams.set('approvedOnly', 'true');
  }

  searchParams.set('sortField', sort.field);
  searchParams.set('sortDirection', sort.direction);
  searchParams.set('page', page.toString());
  searchParams.set('pageSize', pageSize.toString());

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hostaway?${searchParams.toString()}`
  );

  const data: ReviewsApiResponse = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch reviews');
  }

  return {
    reviews: data.data,
    analytics: data.analytics,
    meta: data.meta
  };
}

export async function fetchListings(): Promise<Listing[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hostaway/listings`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch listings');
  }

  return data.data;
}

export async function fetchChannels(): Promise<Channel[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hostaway/channels`);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch channels');
  }

  // Add Google as a channel option
  const channels = data.data as Channel[];
  if (!channels.some((channel) => channel.id === 'google')) {
    channels.push({ id: 'google', name: 'Google' });
  }

  return channels;
}

export async function fetchGoogleReviews(listingName?: string): Promise<NormalizedReview[]> {
  const params = new URLSearchParams();
  if (listingName) {
    params.set('listingName', listingName);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google?${params.toString()}`);
  const data: GoogleReviewsResponse = await response.json();

  if (!data.success) {
    return [];
  }

  return data.data;
}

export async function toggleReviewApproval(reviewId: number, approved: boolean): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewId, approved })
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to update approval status');
  }
}

export async function bulkUpdateApproval(reviewIds: number[], approved: boolean): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/approve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewIds, approved })
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to bulk update approval status');
  }
}

export interface FetchPublicReviewsResponse {
  reviews: PublicReview[];
  stats: ReviewStats;
}

export async function fetchPublicReviews(listingId?: string): Promise<FetchPublicReviewsResponse> {
  const url = listingId
    ? `${process.env.NEXT_PUBLIC_API_URL}/public?listingId=${listingId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/public`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to fetch public reviews');
  }

  return {
    reviews: data.data.reviews,
    stats: data.data.stats
  };
}
