import { HostawayReview } from '@/types/review';

// Realistic mock review data for Flex Living properties
export const mockHostawayReviews: HostawayReview[] = [
  {
    id: 7453,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      "Absolutely stunning apartment with incredible views of the city! The location in Shoreditch couldn't be better - walking distance to amazing restaurants and nightlife. The host was incredibly responsive and helpful throughout our stay.",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-15 14:30:00',
    guestName: 'Sarah Mitchell',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'airbnb',
    reservationId: 12001
  },
  {
    id: 7454,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great location and modern apartment. Had a minor issue with the heating but it was resolved quickly. Would definitely recommend for anyone visiting London.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-11-10 09:15:00',
    guestName: 'Marcus Johnson',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'booking.com',
    reservationId: 12002
  },
  {
    id: 7455,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect stay! The apartment was spotless and exactly as described. Great amenities and the neighborhood has so much to offer. Will definitely book again.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-05 18:45:00',
    guestName: 'Emma Thompson',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'airbnb',
    reservationId: 12003
  },
  {
    id: 7456,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      "Decent apartment but some issues. The WiFi was slow at times and the shower pressure wasn't great. Location is fantastic though and communication was good.",
    reviewCategory: [
      { category: 'cleanliness', rating: 7 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 6 },
      { category: 'accuracy', rating: 7 }
    ],
    submittedAt: '2024-10-28 11:20:00',
    guestName: 'David Chen',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'direct',
    reservationId: 12004
  },

  // Canary Wharf Suite Reviews
  {
    id: 7457,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Business trip perfection! The location near Canary Wharf station made commuting a breeze. Modern, clean, and professional. The gym in the building was a nice bonus.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-18 16:00:00',
    guestName: 'Robert Williams',
    listingName: 'Luxury Suite - Canary Wharf Tower',
    channel: 'airbnb',
    reservationId: 12005
  },
  {
    id: 7458,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Exceeded all expectations! The views from the 25th floor are breathtaking. Everything was immaculate and the check-in process was seamless. Highly recommended!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-12 20:30:00',
    guestName: 'Jennifer Lee',
    listingName: 'Luxury Suite - Canary Wharf Tower',
    channel: 'booking.com',
    reservationId: 12006
  },
  {
    id: 7459,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Very nice property with great amenities. Only minor feedback would be that the kitchen could use a few more cooking utensils. Otherwise, fantastic stay.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 8 }
    ],
    submittedAt: '2024-11-01 12:00:00',
    guestName: 'Michael Brown',
    listingName: 'Luxury Suite - Canary Wharf Tower',
    channel: 'vrbo',
    reservationId: 12007
  },

  // Kensington Garden Flat Reviews
  {
    id: 7460,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'A dream location! Walking distance to Kensington Gardens and so many attractions. The flat has beautiful period features combined with modern comforts. Truly special.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-20 10:00:00',
    guestName: 'Sophie Anderson',
    listingName: 'Elegant Garden Flat - Kensington',
    channel: 'airbnb',
    reservationId: 12008
  },
  {
    id: 7461,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'We celebrated our anniversary here and it was perfect. The host arranged flowers and champagne for us. The attention to detail is remarkable. Thank you Flex Living!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-08 19:45:00',
    guestName: 'James & Emily Parker',
    listingName: 'Elegant Garden Flat - Kensington',
    channel: 'direct',
    reservationId: 12009
  },
  {
    id: 7462,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Lovely flat in a great area. The only downside was some noise from the street, but earplugs solved that. Beautiful interior design and very comfortable beds.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-25 14:30:00',
    guestName: 'Oliver Martinez',
    listingName: 'Elegant Garden Flat - Kensington',
    channel: 'booking.com',
    reservationId: 12010
  },

  // Camden Loft Reviews
  {
    id: 7463,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      "The coolest place I've ever stayed! Industrial chic design with all the modern conveniences. Camden Market is right around the corner. Music lovers will adore this area!",
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-17 15:20:00',
    guestName: 'Alex Rivera',
    listingName: 'Industrial Loft - Camden Town',
    channel: 'airbnb',
    reservationId: 12011
  },
  {
    id: 7464,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      "Unique and stylish apartment with great character. The exposed brick and high ceilings are gorgeous. A bit noisy on weekend nights but that's Camden for you!",
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-11-03 08:00:00',
    guestName: 'Hannah Wilson',
    listingName: 'Industrial Loft - Camden Town',
    channel: 'vrbo',
    reservationId: 12012
  },
  {
    id: 7465,
    type: 'guest-to-host',
    status: 'published',
    rating: 3,
    publicReview:
      'Good location and interesting design. However, the bed was quite hard and the bathroom could use updating. Communication was excellent though.',
    reviewCategory: [
      { category: 'cleanliness', rating: 8 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 6 },
      { category: 'accuracy', rating: 7 }
    ],
    submittedAt: '2024-10-20 17:00:00',
    guestName: 'Thomas Baker',
    listingName: 'Industrial Loft - Camden Town',
    channel: 'booking.com',
    reservationId: 12013
  },

  // Greenwich Studio Reviews
  {
    id: 7466,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect little studio with everything you need. So close to Greenwich Park and the Observatory. Felt like a local! The kitchen was surprisingly well-equipped.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-14 13:00:00',
    guestName: 'Lisa Zhang',
    listingName: 'Cozy Studio - Greenwich Village',
    channel: 'airbnb',
    reservationId: 12014
  },
  {
    id: 7467,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'What a gem! Small but perfectly formed. The host thought of everything - from the coffee machine to the Netflix subscription. Will definitely return!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-06 21:15:00',
    guestName: 'Chris Taylor',
    listingName: 'Cozy Studio - Greenwich Village',
    channel: 'direct',
    reservationId: 12015
  },

  // Westminster Penthouse Reviews
  {
    id: 7468,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Absolutely magnificent! The penthouse is stunning with views of Westminster Abbey. Worth every penny. The private terrace was perfect for evening drinks.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-19 09:30:00',
    guestName: 'Victoria Hughes',
    listingName: 'Premium Penthouse - Westminster',
    channel: 'airbnb',
    reservationId: 12016
  },
  {
    id: 7469,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'The pinnacle of London living! We hosted a small family gathering here and everyone was impressed. Immaculate, spacious, and luxurious. Top notch service.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-02 16:45:00',
    guestName: 'Richard & Margaret Collins',
    listingName: 'Premium Penthouse - Westminster',
    channel: 'booking.com',
    reservationId: 12017
  },

  // More varied reviews for analytics
  {
    id: 7470,
    type: 'guest-to-host',
    status: 'published',
    rating: 2,
    publicReview:
      'Disappointing experience. The apartment was not as clean as expected and there were maintenance issues with the bathroom. Management did try to resolve but we had already lost a day of our trip.',
    reviewCategory: [
      { category: 'cleanliness', rating: 4 },
      { category: 'communication', rating: 8 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 4 },
      { category: 'accuracy', rating: 5 }
    ],
    submittedAt: '2024-10-15 11:00:00',
    guestName: 'Peter Graham',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'airbnb',
    reservationId: 12018
  },
  {
    id: 7471,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Nice apartment, well located. Check-in was smooth. Minor issue with hot water but resolved within hours. Would stay again.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-08 14:20:00',
    guestName: 'Natalie Adams',
    listingName: 'Luxury Suite - Canary Wharf Tower',
    channel: 'vrbo',
    reservationId: 12019
  },
  {
    id: 7472,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Superb! From booking to checkout, everything was handled professionally. The apartment exceeded our expectations. Clean, modern, and perfectly located.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-09-28 18:00:00',
    guestName: 'Carlos Mendez',
    listingName: 'Elegant Garden Flat - Kensington',
    channel: 'airbnb',
    reservationId: 12020
  },
  {
    id: 7473,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great location for exploring London. The apartment is compact but has everything needed. WiFi was fast and the bed comfortable.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-09-20 10:30:00',
    guestName: 'Amy Foster',
    listingName: 'Cozy Studio - Greenwich Village',
    channel: 'booking.com',
    reservationId: 12021
  },
  {
    id: 7474,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Incredible stay! The attention to detail is what sets Flex Living apart. From the quality linens to the welcome pack, everything was thoughtful.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-09-15 15:45:00',
    guestName: 'Diana Ross-Smith',
    listingName: 'Industrial Loft - Camden Town',
    channel: 'direct',
    reservationId: 12022
  },
  {
    id: 7475,
    type: 'host-to-guest',
    status: 'published',
    rating: null,
    publicReview:
      'Sarah was a wonderful guest! Left the apartment in perfect condition. Would love to host again.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'respect_house_rules', rating: 10 }
    ],
    submittedAt: '2024-11-16 10:00:00',
    guestName: 'Sarah Mitchell',
    listingName: '2B N1 A - 29 Shoreditch Heights',
    channel: 'airbnb',
    reservationId: 12001
  },
  {
    id: 7476,
    type: 'guest-to-host',
    status: 'pending',
    rating: 5,
    publicReview: 'Amazing property! Will write full review soon.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-22 08:00:00',
    guestName: 'George Miller',
    listingName: 'Premium Penthouse - Westminster',
    channel: 'airbnb',
    reservationId: 12023
  },
  // Additional reviews for comprehensive data
  {
    id: 7477,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Solid choice for business travel. Clean, quiet, and well-maintained. The location near the tube was very convenient. Would recommend to colleagues.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-09-05 12:00:00',
    guestName: 'Benjamin Clarke',
    listingName: 'Luxury Suite - Canary Wharf Tower',
    channel: 'booking.com',
    reservationId: 12024
  },
  {
    id: 7478,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'We had the most wonderful family holiday! The kids loved the space and we loved the location. Easy access to all major attractions. Flex Living made everything so easy!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-08-25 17:30:00',
    guestName: 'The Henderson Family',
    listingName: 'Elegant Garden Flat - Kensington',
    channel: 'vrbo',
    reservationId: 12025
  },

  // Riverside Apartment - Southbank Reviews
  {
    id: 7479,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Waking up to Thames views every morning was magical! The apartment is perfectly located near all the Southbank attractions. Borough Market is a must-visit for breakfast. Highly recommend!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-20 10:30:00',
    guestName: 'Alexandra Hughes',
    listingName: 'Riverside Apartment - Southbank',
    channel: 'airbnb',
    reservationId: 12026
  },
  {
    id: 7480,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great location for cultural activities. Tate Modern is just a short walk away. The apartment was clean and well-equipped. Only minor issue was some noise from the street on Friday night.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-11-08 14:00:00',
    guestName: 'Thomas Wright',
    listingName: 'Riverside Apartment - Southbank',
    channel: 'booking.com',
    reservationId: 12027
  },

  // Modern Flat - Kings Cross Reviews
  {
    id: 7481,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect for our Eurostar arrival! We literally walked from St Pancras in 5 minutes. The flat is super modern and the area has transformed beautifully. Coal Drops Yard is fantastic for shopping and dining.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-18 09:00:00',
    guestName: 'Marie Dubois',
    listingName: 'Modern Flat - Kings Cross',
    channel: 'airbnb',
    reservationId: 12028
  },
  {
    id: 7482,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Sleek and stylish apartment in a great location. The smart home features were a nice touch. Would have appreciated a slightly larger kitchen but otherwise excellent.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-25 16:30:00',
    guestName: 'James Patterson',
    listingName: 'Modern Flat - Kings Cross',
    channel: 'direct',
    reservationId: 12029
  },

  // Victorian Townhouse - Notting Hill Reviews
  {
    id: 7483,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Absolutely fell in love with this townhouse! The period features are stunning and the location on a quiet street is perfect. We spent hours exploring the antique shops on Portobello Road. A dream London stay!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-15 11:00:00',
    guestName: 'Victoria Sterling',
    listingName: 'Victorian Townhouse - Notting Hill',
    channel: 'vrbo',
    reservationId: 12030
  },
  {
    id: 7484,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'The perfect family base for our London adventure! Three floors gave everyone their own space. The private patio was lovely for morning coffee. Notting Hill is even more charming in person.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-10-30 13:00:00',
    guestName: 'The Andersons',
    listingName: 'Victorian Townhouse - Notting Hill',
    channel: 'airbnb',
    reservationId: 12031
  },

  // Art Deco Suite - Marylebone Reviews
  {
    id: 7485,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'What a stunning apartment! The Art Deco details are exquisite - from the light fixtures to the bathroom tiles. Marylebone High Street has the best coffee shops. Felt like living in a design magazine!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-12 15:00:00',
    guestName: 'Isabelle Chen',
    listingName: 'Art Deco Suite - Marylebone',
    channel: 'airbnb',
    reservationId: 12032
  },
  {
    id: 7486,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Beautiful apartment with lots of character. The welcome hamper was a lovely touch! Location is excellent for walking to Oxford Street and Regents Park. The only minor issue was parking nearby was tricky.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-18 12:00:00',
    guestName: 'Richard Moore',
    listingName: 'Art Deco Suite - Marylebone',
    channel: 'booking.com',
    reservationId: 12033
  },

  // Docklands Executive Apartment Reviews
  {
    id: 7487,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Perfect for my month-long work assignment! The apartment was spacious, quiet, and had everything I needed. Easy commute to Canary Wharf and the dock views were a nice bonus after long days.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-10 08:30:00',
    guestName: 'Michael Santos',
    listingName: 'Docklands Executive Apartment',
    channel: 'direct',
    reservationId: 12034
  },
  {
    id: 7488,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great value for the space you get. Two proper bedrooms and two bathrooms - perfect for traveling with a colleague. The area is still developing but has a nice waterside feel. DLR is very convenient.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 8 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-05 17:00:00',
    guestName: 'Laura Bennett',
    listingName: 'Docklands Executive Apartment',
    channel: 'airbnb',
    reservationId: 12035
  },

  // Chelsea Garden Apartment Reviews
  {
    id: 7489,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Quintessentially English! The private garden was a delight - we had breakfast out there every morning. Chelsea is such an elegant neighborhood. The apartment felt like a proper London home.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-14 10:00:00',
    guestName: 'Catherine Wells',
    listingName: 'Chelsea Garden Apartment',
    channel: 'vrbo',
    reservationId: 12036
  },
  {
    id: 7490,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Loved every moment of our stay! The Kings Road is perfect for shopping and dining. The apartment has such character with beautiful period features. The marble bathroom was absolutely gorgeous.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-10-22 14:30:00',
    guestName: 'Sophia Martinez',
    listingName: 'Chelsea Garden Apartment',
    channel: 'airbnb',
    reservationId: 12037
  },

  // Clerkenwell Warehouse Conversion Reviews
  {
    id: 7491,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Architecturally stunning! The double-height ceilings and original beams create such an inspiring space. Perfect for my photography business trip. Exmouth Market has amazing food options.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-16 09:30:00',
    guestName: 'Oliver Grant',
    listingName: 'Clerkenwell Warehouse Conversion',
    channel: 'airbnb',
    reservationId: 12038
  },
  {
    id: 7492,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Such a unique space! Felt like staying in a design studio. The Sonos speakers were great for working from home. Trendy neighborhood with lots to explore. Could use blackout curtains for the skylights.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 8 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-08 11:00:00',
    guestName: 'Hannah Fischer',
    listingName: 'Clerkenwell Warehouse Conversion',
    channel: 'booking.com',
    reservationId: 12039
  },

  // Hampstead Heath Retreat Reviews
  {
    id: 7493,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'The perfect escape from city life while still being in London! We swam in the bathing ponds every morning and explored the heath. The apartment is charming and the village has wonderful cafes.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-11 16:00:00',
    guestName: 'Emily Richardson',
    listingName: 'Hampstead Heath Retreat',
    channel: 'airbnb',
    reservationId: 12040
  },
  {
    id: 7494,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Peaceful and beautiful. The period cottage feel was exactly what we needed after a hectic work schedule. Walking on the Heath at sunset is unforgettable. A hidden gem of London.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 9 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-09-28 13:00:00',
    guestName: 'Daniel Park',
    listingName: 'Hampstead Heath Retreat',
    channel: 'direct',
    reservationId: 12041
  },

  // Brixton Creative Studio Reviews
  {
    id: 7495,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Best value in London! Brixton is buzzing with energy. Loved exploring the market and catching live music. The studio is compact but has everything you need. Perfect for solo travelers!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-17 12:00:00',
    guestName: 'Jake Morrison',
    listingName: 'Brixton Creative Studio',
    channel: 'airbnb',
    reservationId: 12042
  },
  {
    id: 7496,
    type: 'guest-to-host',
    status: 'published',
    rating: 4,
    publicReview:
      'Great little studio in an authentic London neighborhood. The record collection was a fun touch! Tube station is right there. Some street noise at night but thats part of the Brixton experience.',
    reviewCategory: [
      { category: 'cleanliness', rating: 9 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 9 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 9 }
    ],
    submittedAt: '2024-10-12 15:30:00',
    guestName: 'Mia Thompson',
    listingName: 'Brixton Creative Studio',
    channel: 'booking.com',
    reservationId: 12043
  },

  // Tower Bridge Luxury Flat Reviews
  {
    id: 7497,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Watching Tower Bridge raise from our living room was absolutely magical! The apartment is immaculate with stunning views from every window. Worth every penny for this once-in-a-lifetime experience.',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 10 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-11-19 11:30:00',
    guestName: 'William & Charlotte Brooks',
    listingName: 'Tower Bridge Luxury Flat',
    channel: 'airbnb',
    reservationId: 12044
  },
  {
    id: 7498,
    type: 'guest-to-host',
    status: 'published',
    rating: 5,
    publicReview:
      'Spectacular location and luxurious apartment. The concierge service was excellent. We walked to the Tower of London and Borough Market. The floor-to-ceiling windows make you feel like youre floating above the Thames!',
    reviewCategory: [
      { category: 'cleanliness', rating: 10 },
      { category: 'communication', rating: 10 },
      { category: 'location', rating: 10 },
      { category: 'value', rating: 9 },
      { category: 'accuracy', rating: 10 }
    ],
    submittedAt: '2024-10-28 14:00:00',
    guestName: 'Jennifer Adams',
    listingName: 'Tower Bridge Luxury Flat',
    channel: 'vrbo',
    reservationId: 12045
  }
];

// Helper to generate listing ID (must match review-normalizer.ts)
function generateListingId(listingName: string): string {
  return listingName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
}

// Helper to get unique listings
export const getUniqueListings = () => {
  const listings = new Map<string, string>();
  mockHostawayReviews.forEach((review) => {
    const listingId = generateListingId(review.listingName);
    listings.set(listingId, review.listingName);
  });
  return Array.from(listings.entries()).map(([id, name]) => ({ id, name }));
};

// Helper to get unique channels
export const getUniqueChannels = () => {
  const channels = new Set<string>();
  mockHostawayReviews.forEach((review) => {
    if (review.channel) channels.add(review.channel);
  });
  return Array.from(channels);
};
