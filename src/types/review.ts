// Hostaway API Response Types
export interface HostawayReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'draft';
  rating: number | null;
  publicReview: string;
  reviewCategory: HostawayReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: string;
  reservationId?: number;
  privateReview?: string;
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}

// Normalized Review Types for Dashboard
export interface NormalizedReviewCategory {
  category: string;
  rating: number;
  displayName: string;
}

export interface NormalizedReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'draft';
  overallRating: number | null;
  averageRating: number | null;
  publicReview: string;
  privateReview?: string;
  categories: NormalizedReviewCategory[];
  submittedAt: Date;
  formattedDate: string;
  guestName: string;
  listingName: string;
  listingId: string;
  channel: string;
  channelIcon?: string;
  isApprovedForWebsite: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
}

// Property Analytics
export interface PropertyAnalytics {
  listingId: string;
  listingName: string;
  totalReviews: number;
  averageRating: number;
  categoryAverages: Record<string, number>;
  ratingDistribution: Record<number, number>;
  recentTrend: 'improving' | 'stable' | 'declining';
  topIssues: string[];
  approvedCount: number;
  channelBreakdown: Record<string, number>;
}

// Dashboard Filter Types
export interface ReviewFilters {
  listingId?: string;
  channel?: string;
  type?: 'host-to-guest' | 'guest-to-host';
  status?: string;
  minRating?: number;
  maxRating?: number;
  dateFrom?: string;
  dateTo?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  searchQuery?: string;
  approvedOnly?: boolean;
}

export interface SortOptions {
  field: 'date' | 'rating' | 'guestName' | 'listingName';
  direction: 'asc' | 'desc';
}

// API Response Types
export interface ReviewsApiResponse {
  success: boolean;
  data: NormalizedReview[];
  analytics: PropertyAnalytics[];
  meta: {
    total: number;
    filtered: number;
    page: number;
    pageSize: number;
  };
}

// Public Review for display
export interface PublicReview {
  id: number;
  guestName: string;
  rating: number;
  review: string;
  date: string;
  listingName: string;
  categories: NormalizedReviewCategory[];
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  categoryAverages: Record<string, number>;
}

// Listing and Channel types
export interface Listing {
  id: string;
  name: string;
}

export interface Channel {
  id: string;
  name: string;
}

// Property data types
export interface PropertyData {
  name: string;
  location: string;
  price: string;
  description: string;
  features: string[];
  images: string[];
  rating: string;
  googlePlaceId?: string;
}

// Google Places API Review Types
export interface GoogleReviewAuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

export interface GoogleReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: string;
  };
  originalText?: {
    text: string;
    languageCode: string;
  };
  authorAttribution: GoogleReviewAuthorAttribution;
  publishTime: string;
}

export interface GooglePlaceDetails {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}
