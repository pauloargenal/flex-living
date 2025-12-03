'use client';

import { useState } from 'react';

interface PropertyGalleryWidgetProps {
  images: string[];
  propertyName: string;
}

export function PropertyGalleryWidget({ images, propertyName }: PropertyGalleryWidgetProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div className="lg:col-span-2 rounded-2xl overflow-hidden h-96">
        <img
          src={images[selectedImage]}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {images.slice(0, 2).map((img, index) => (
          <button
            type="button"
            key={img}
            onClick={() => setSelectedImage(index)}
            className={`rounded-xl overflow-hidden h-32 lg:h-44 border-2 transition-all
              ${
                selectedImage === index
                  ? 'border-green-100'
                  : 'border-transparent hover:border-black-20'
              }`}
          >
            <img src={img} alt={propertyName} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
