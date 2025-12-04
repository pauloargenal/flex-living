import { GoogleReview } from '@/types/review';

// Mock Google reviews for Google API
export const mockGoogleReviews: GoogleReview[] = [
  {
    name: 'places/ChIJ123/reviews/1',
    relativePublishTimeDescription: '2 weeks ago',
    rating: 5,
    text: {
      text: 'Amazing stay! The apartment was exactly as pictured, very clean and modern. The host was incredibly responsive and helpful. Would definitely stay again!',
      languageCode: 'en'
    },
    authorAttribution: {
      displayName: 'Sarah M.',
      uri: 'https://www.google.com/maps/contrib/123',
      photoUri: ''
    },
    publishTime: '2024-11-15T10:30:00Z'
  },
  {
    name: 'places/ChIJ123/reviews/2',
    relativePublishTimeDescription: '1 month ago',
    rating: 4,
    text: {
      text: 'Great location, walking distance to everything. The apartment was comfortable and well-equipped. Only minor issue was the wifi was a bit slow at times.',
      languageCode: 'en'
    },
    authorAttribution: {
      displayName: 'James T.',
      uri: 'https://www.google.com/maps/contrib/456',
      photoUri: ''
    },
    publishTime: '2024-10-20T14:00:00Z'
  },
  {
    name: 'places/ChIJ123/reviews/3',
    relativePublishTimeDescription: '2 months ago',
    rating: 5,
    text: {
      text: 'Perfect for our family vacation. Spacious, clean, and the kitchen had everything we needed. The neighborhood felt very safe. Highly recommend!',
      languageCode: 'en'
    },
    authorAttribution: {
      displayName: 'Maria G.',
      uri: 'https://www.google.com/maps/contrib/789',
      photoUri: ''
    },
    publishTime: '2024-09-28T09:15:00Z'
  },
  {
    name: 'places/ChIJ123/reviews/4',
    relativePublishTimeDescription: '3 months ago',
    rating: 3,
    text: {
      text: 'Decent place for the price. Location was good but the apartment could use some updates. Check-in process was smooth though.',
      languageCode: 'en'
    },
    authorAttribution: {
      displayName: 'David L.',
      uri: 'https://www.google.com/maps/contrib/101',
      photoUri: ''
    },
    publishTime: '2024-08-15T16:45:00Z'
  }
];
