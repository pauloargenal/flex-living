import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { Listing } from '@/types/properties';
import { StarRating } from '@/components/star-rating';

interface PropertyGridProps {
  listings: Listing[];
  properties: Record<string, string>;
  common: Record<string, string>;
  propertyImages: Record<string, string>;
  propertyDescriptions: Record<string, string>;
}

export default function PropertyListings({
  listings,
  properties,
  common,
  propertyImages,
  propertyDescriptions
}: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <Link key={listing.id} href={`/properties/${listing.id}`} className="group">
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black-10 
            hover:shadow-xl hover:border-green-100/30 transition-all duration-300"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={propertyImages[listing.id] || ''}
                alt={listing.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-100/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg truncate">{listing.name}</h3>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black-100">
                  {properties.fromPerNight.replace('{price}', '150')}
                </span>
              </div>
            </div>

            <div className="p-5">
              <p className="text-black-60 text-sm line-clamp-2 mb-4">
                {propertyDescriptions[listing.id] || ''}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating rating={5} size="md" />
                  <span className="text-sm text-black-50">{properties.excellent}</span>
                </div>
                <span className="text-green-100 text-sm font-medium group-hover:underline inline-flex items-center gap-1">
                  {common.viewDetails}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
