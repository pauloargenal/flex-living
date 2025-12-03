import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Slash, Star } from 'lucide-react';

import { Footer } from '../../components/footer';

import PropertyListings from './widgets/property-listings';

import { getLocale } from '@/utils/get-locales';
import { getUniqueListings } from '@/data/mock-reviews';
import { propertyImages, propertyDescriptions } from '@/data/properties';
import { BrandLogo } from '@/components/brand-logo';
import { StarRating } from '@/components/star-rating';

export const metadata: Metadata = {
  title: 'Properties | Flex Living',
  description: 'Explore our collection of premium serviced apartments across London'
};

const AVATAR_SEEDS = `https://i.pravatar.cc/32?img=`;

export default async function PropertiesPage() {
  const { common, properties } = await getLocale();
  const listings = getUniqueListings();

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black-100 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <BrandLogo
              variant="light"
              size="md"
              brandName={common.brandName}
              brandShort={common.brandShort}
            />

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/properties" className="text-white font-medium">
                {common.properties}
              </Link>
              <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                {common.dashboard}
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={common.about}
              >
                {common.about}
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white transition-colors"
                aria-label={common.contact}
              >
                {common.contact}
              </Link>
            </nav>

            <Link
              href="/dashboard"
              className="px-4 py-2 bg-green-100 text-white rounded-lg text-sm font-medium hover:bg-green-80 transition-colors"
            >
              {common.dashboard}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-black-100 to-black-90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {properties.heroTitle}
              <br />
              <span className="text-green-100">{properties.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">{properties.heroDescription}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[11, 45, 67, 20].map((seed) => (
                    <img
                      key={seed}
                      src={`${AVATAR_SEEDS}${seed}`}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-black-100 object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/70">{properties.happyGuests}</span>
              </div>
              <Slash className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Star key={i} className="w-4 h-4 text-citrine-100 fill-citrine-100" />
                ))}

                <span className="text-sm text-white/70">{properties.averageRating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <>
              <h2 className="text-2xl font-bold text-black-100">{properties.ourProperties}</h2>
              <p className="text-black-60 mt-1">{properties.exploreCollection}</p>
            </>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black-50">
                {listings.length} {common.properties}
              </span>
            </div>
          </div>

          <PropertyListings
            listings={listings}
            properties={properties}
            common={common}
            propertyImages={propertyImages}
            propertyDescriptions={propertyDescriptions}
          />
        </div>
      </section>

      <section className="bg-green-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-black-100 mb-4">{properties.cantFindProperty}</h2>
          <p className="text-black-60 mb-8 max-w-2xl mx-auto">
            {properties.cantFindPropertyDescription}
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-white rounded-lg font-medium hover:bg-green-80 transition-colors"
          >
            {properties.cantFindPropertyContactUs}
          </Link>
        </div>
      </section>

      <Footer properties={properties} common={common} />
    </div>
  );
}
