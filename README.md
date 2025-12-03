# Flex Living Reviews Dashboard

A comprehensive reviews management platform for Flex Living properties. Managers can monitor, analyze, filter, and curate guest reviews, while approved reviews are displayed on public property pages.

## Features

### Manager Dashboard

- 📊 **Analytics Overview** - Track property performance with visual rating distributions
- 🔍 **Smart Filtering** - Filter by property, channel, rating, sentiment, and date
- ✓ **Review Curation** - Select which reviews appear on your public website
- ⚠️ **Issue Detection** - Identify underperforming categories
- 🏠 **Multi-Channel** - Aggregate reviews from Airbnb, Booking.com, VRBO, and direct bookings

### Public Property Pages

- 🏡 **Property Listings** - Beautiful property showcase
- ⭐ **Guest Reviews** - Curated, approved reviews
- 📈 **Rating Summary** - Category breakdowns and overall scores

## Project Structure

- src - Application source code
  - app - Routes (e.g. src/app/home/page.tsx). Any code that is specific to a route may live in the route directory (e.g. src/app/home/widgets/welcome.tsx).
  - components - JSX elements that are reusable and application-specific
  - hooks - Custom React hooks used in components and widgets
  - locales - JSON files that contain strings for use in pages, widgets and components
  - services - Structures that contain fetch logic
  - types - Shared TypeScript types
  - utils - Generic utility functions used across the application
  - widgets - Reusable features that can contain components and make use of services

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Routes

| Route              | Description              |
| ------------------ | ------------------------ |
| `/`                | Landing page             |
| `/dashboard`       | Manager dashboard        |
| `/properties`      | Public property listings |
| `/properties/[id]` | Property with reviews    |

## API Endpoints

| Endpoint                         | Method   | Description              |
| -------------------------------- | -------- | ------------------------ |
| `/api/reviews/hostaway`          | GET      | Fetch normalized reviews |
| `/api/reviews/hostaway/listings` | GET      | Get properties list      |
| `/api/reviews/hostaway/channels` | GET      | Get booking channels     |
| `/api/reviews/approve`           | POST/PUT | Update review approval   |
| `/api/reviews/public`            | GET      | Fetch approved reviews   |

## Tech Stack

- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zod** - Runtime validation

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed documentation including design decisions, API behaviors, and Google Reviews findings.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run test     # Tests
```

## License

© 2024 Flex Living. All rights reserved.
