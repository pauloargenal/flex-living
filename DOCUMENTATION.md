# Flex Living - Technical Decisions

## Table of Contents

1. [Key Design Decisions](#key-design-decisions)
2. [Data Flow](#data-flow)
3. [Review Normalization](#review-normalization)
4. [Trend & Issue Detection](#trend--issue-detection)
5. [Approval System](#approval-system)
6. [Environment-Specific Logic](#environment-specific-logic)
7. [Areas for Improvement](#areas-for-improvement)

## Key Design Decisions

### 1. Review Normalization Pattern

**Decision:** All reviews from different sources so creating a normalize function to a `NormalizedReview` object before displaying them in the app.

**Rationale:**

- Different platforms (Hostaway, Google) have different data structures
- UI components only need to work with one consistent format

**Implementation:**

```typescript
// src/types/review.ts
interface NormalizedReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'draft';
  overallRating: number | null;
  publicReview: string;
  categories: NormalizedReviewCategory[];
  submittedAt: Date;
  guestName: string;
  listingName: string;
  channel: string; // 'airbnb', 'google', 'booking.com', etc.
  sentiment: 'positive' | 'neutral' | 'negative';
  isApprovedForWebsite: boolean;
}
```

### 2. Rating/Sentiment Analysis

**Decision:** This uses rating thresholds sentiment classification. This will check if the rating is positive, newtral or negative.

**Rationale:**

- Simple and fast
- Sufficient for this use case

**Logic:**

```typescript
function determineSentiment(rating: number | null): 'positive' | 'neutral' | 'negative' {
  if (rating === null) return 'neutral';
  if (rating >= 4) return 'positive';
  if (rating >= 3) return 'neutral';
  return 'negative';
}
```

### 3. Server Components for Static Pages

**Decision:** Use Next.js Server Components for property pages and Client Components only where interactivity is needed.

**Rationale:**

- Faster initial page load
- Reduced JavaScript bundle size
- Routing is already setup via Nextjs folder structure

### 4. Params as Promise (Next.js 15+)

**Decision:** Handle `params` as a Promise in dynamic routes.

**Rationale:**

- Enables better streaming and async data fetching
- Better use case for persisting a property display on page refresh

**Implementation:**

```typescript
interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params; // Must await params
  const property = getPropertyById(id);
}
```

---

## Data Flow

### Dashboard Data Flow

```
1. useFetchReviews hook initializes
2. Parallel fetch: Hostaway API + Google Reviews API
3. Both responses normalized to NormalizedReview[]
4. Reviews merged and client-side filtered
5. Analytics calculated from normalized data
6. UI renders with reviews + analytics
```

### Public Reviews Data Flow

```
1. User visits /properties/[id]
2. Server fetches approved review IDs
3. Server fetches all reviews for property
4. Filters to only approved reviews
5. Updated JSON file storage in local
6. Returns curated reviews to client
```

---

## Review Normalization

### Hostaway Reviews

```typescript
// Input: Hostaway API format
{
  id: 7453,
  type: 'guest-to-host',
  rating: 5,
  publicReview: "Great stay!",
  reviewCategory: [
    { category: 'cleanliness', rating: 10 },
    { category: 'communication', rating: 9 }
  ],
  guestName: "John D.",
  listingName: "Shoreditch Heights"
}

// Output: Normalized format
{
  id: 7453,
  type: 'guest-to-host',
  overallRating: 5,
  averageRating: 4.75,  // (10+9)/2 / 2 (converted to 5-scale)
  publicReview: "Great stay!",
  categories: [
    { category: 'cleanliness', rating: 10, displayName: 'Cleanliness' },
    { category: 'communication', rating: 9, displayName: 'Communication' }
  ],
  guestName: "John D.",
  listingName: "Shoreditch Heights",
  listingId: "shoreditch-heights",
  channel: "airbnb",
  channelIcon: "",
  sentiment: "positive",
  isApprovedForWebsite: true
}
```

### Google Reviews

```typescript
// Input: Google Places API format
{
  name: "places/ChIJ.../reviews/abc123",
  rating: 4,
  text: { text: "Nice apartment!" },
  authorAttribution: { displayName: "Jane S." },
  publishTime: "2024-01-15T10:30:00Z"
}

// Output: Normalized format (same interface)
{
  id: 123456,  // Generated from review name
  type: 'guest-to-host',
  overallRating: 4,
  publicReview: "Nice apartment!",
  categories: [],  // Google doesn't provide categories
  guestName: "Jane S.",
  channel: "google",
  channelIcon: "",
  sentiment: "positive"
}
```

---

## Trend & Issue Detection

### Trend Detection

Compares the average rating of the **last 3 reviews** vs the **previous 3 reviews**.

```typescript
// Requires at least 6 reviews
if (sortedByDate.length >= 6) {
  const recentAvg = average(sortedByDate.slice(0, 3));
  const previousAvg = average(sortedByDate.slice(3, 6));

  if (recentAvg > previousAvg + 0.3) return 'improving';
  if (recentAvg < previousAvg - 0.3) return 'declining';
  return 'stable';
}
```

**Thresholds:**

- `> +0.3` improvement → "Improving" (green ↑)
- `< -0.3` decline → "Declining" (red ↓)
- Otherwise → "Stable" (yellow →)

### Issue Detection Algorithm

Categories with an average rating **below 8/10** are flagged as issues.

```typescript
const topIssues: string[] = [];
Object.entries(categoryAverages).forEach(([category, avg]) => {
  if (avg < 8) {
    topIssues.push(category);
  }
});
```

**Display:** Shows in red alert box: "Areas to improve: Cleanliness, Value"

## Approval System

### Storage Strategy

| Environment | Storage Method                        | Persistence         |
| ----------- | ------------------------------------- | ------------------- |
| Local Dev   | File system (`approved-reviews.json`) | ✅ Persists         |
| Vercel/Prod | In-memory Set                         | ⚠️ Resets on deploy |

### Environment Detection

```typescript
const IS_VERCEL = process.env.VERCEL === '1';

async function writeApprovedIds(ids: Set<number>) {
  if (IS_VERCEL) {
    // In-memory update (Vercel has read-only filesystem)
    inMemoryApprovedIds.clear();
    ids.forEach((id) => inMemoryApprovedIds.add(id));
  } else {
    // File-based storage (local development)
    await fs.writeFile(DATA_FILE, JSON.stringify([...ids]));
  }
}
```

---

## Environment-Specific Logic

### Environment Variables

| Variable                | Purpose                     | Required             |
| ----------------------- | --------------------------- | -------------------- |
| `VERCEL`                | Auto-set by Vercel to `"1"` | Auto                 |
| `HOSTAWAY_API_KEY`      | Hostaway authentication     | Optional (uses mock) |
| `GOOGLE_PLACES_API_KEY` | Google Reviews API          | Optional (uses mock) |
| `NEXT_PUBLIC_API_URL`   | API base URL                | Yes                  |

### Fallback Strategy

All external APIs gracefully fallback to mock data:

```typescript
async function fetchHostawayReviews() {
  try {
    const response = await fetch(HOSTAWAY_API_URL);
    if (!response.ok) return mockHostawayReviews;
    const data = await response.json();
    return data.result || mockHostawayReviews;
  } catch {
    return mockHostawayReviews; // Network error fallback
  }
}
```

---

## Areas For Improvement

- Update JSON storage to persist approvals in production, integrate a database.
- Server side logic to code split and make it more robust

---

### Running Tests

```bash
npm test          # Run all tests
npm test -- --watch  # Watch mode
```

## Google Reviews Integration

### API Configuration

Uses Google Places API (New) with field masks:

```typescript
const response = await fetch(`${GOOGLE_PLACES_API_URL}/${placeId}?fields=reviews`, {
  headers: {
    'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
    'X-Goog-FieldMask': 'id,displayName,rating,reviews'
  }
});
```

### Place IDs

Each property has a `googlePlaceId` for fetching location-specific reviews:

```typescript
// src/data/properties.ts
{
  id: 'shoreditch-heights',
  name: 'Shoreditch Heights',
  googlePlaceId: 'ChIJuYlRxSYbdkgRqVQ0mQU1Agc',
  // ...
}
```

### Limitations

- Google returns max ~5 reviews per place
- Fallback for mock data base on google api response
- No category breakdowns (unlike Hostaway)
- Reviews are public only (no private feedback)
