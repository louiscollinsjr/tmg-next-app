'use client';

import { useState } from 'react';
import ProfessionalCard from './ProfessionalCard';

interface Professional {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
}

interface ProfessionalsGridProps {
  professionals: Professional[];
}

export default function ProfessionalsGrid({ professionals }: ProfessionalsGridProps) {
  const [showAll, setShowAll] = useState(false);
  console.log('Number of professionals:', professionals?.length || 0);
  
  if (!professionals?.length) {
    return (
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">Featured Professionals</h2>
              <p className="text-gray-500">Discover top-rated professionals in your area</p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No professionals found. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const displayedProfessionals = showAll ? professionals : professionals.slice(0, 9);
  const hasMore = professionals.length > 9;

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
        {/* Grid Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Featured Professionals</h2>
            <p className="text-gray-500">Discover top-rated professionals in your area</p>
          </div>
          {hasMore && (
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {displayedProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
