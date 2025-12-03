import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckIcon, MapPin } from 'lucide-react';

import { getLocale } from '@/utils/get-locales';
import { getPropertyById, getAllPropertyIds } from '@/data/properties';
import { BrandLogo } from '@/components/brand-logo';
import { StarRating } from '@/components/star-rating';
import { PropertyGalleryWidget } from '@/app/properties/widgets/property-gallery-widget';
import { PropertyBookingWidget } from '@/app/properties/[id]/widgets/property-booking-widget';
import { PropertyReviewsWidget } from '@/app/properties/widgets/property-reviews-widget';
import { Footer } from '@/components/footer';
import BreadCrumbs from '@/components/bread-crumbs';

interface PropertyDetailPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const ids = getAllPropertyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const property = getPropertyById(params.id);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${property.name} | Flex Living`,
    description: property.description
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const fixRating = '4.8';
  const { common, propertyDetail, properties } = await getLocale();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-black-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <BrandLogo
              variant="dark"
              size="sm"
              brandName={common.brandName}
              brandShort={common.brandShort}
            />

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/properties"
                className="text-sm text-black-60 hover:text-black-100 transition-colors"
              >
                {common.properties}
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-black-60 hover:text-black-100 transition-colors"
              >
                {common.dashboard}
              </Link>
            </nav>

            <a
              href="#book"
              className="px-4 py-2 bg-green-100 text-white rounded-lg text-sm font-medium hover:bg-green-80 transition-colors"
            >
              {propertyDetail.bookNow}
            </a>
          </div>
        </div>
      </header>

      <BreadCrumbs locales={common} title={property.name} />

      {/* Property Hero */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery (Client Component) */}
          <PropertyGalleryWidget images={property.images} propertyName={property.name} />

          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between gap-4 mb-6">
                <>
                  <h1 className="text-3xl font-bold text-black-100 mb-2">{property.name}</h1>
                  <p className="text-black-60 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {property.location}
                  </p>
                </>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} />
                    <span className="text-xl font-bold text-black-100">{fixRating}</span>
                  </div>
                </div>
              </div>

              <p className="text-black-70 leading-relaxed mb-8">{property.description}</p>

              {/* Features */}
              <div className="bg-black-5 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-black-100 mb-4">{propertyDetail.amenities}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-100" />
                      <span className="text-sm text-black-70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card (Client Component) */}
            <div className="lg:col-span-1" id="book">
              <PropertyBookingWidget price={property.price} locale={propertyDetail} />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-black-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyReviewsWidget listingId={params.id} locale={propertyDetail} />
        </div>
      </section>

      <Footer properties={properties} common={common} />
    </div>
  );
}
