'use client';

import { useState } from 'react';
import ProfessionalListItem from './ProfessionalListItem';
import { DisplayProfessional } from '@/types/professional';

interface ProfessionalsGridProps {
  professionals: DisplayProfessional[];
  selectedCategory: string | null;
}

export default function ProfessionalsGrid({ professionals, selectedCategory }: ProfessionalsGridProps) {
  const [showAll, setShowAll] = useState(false);

  const filteredProfessionals = selectedCategory
    ? professionals.filter(professional => 
        professional.selectedServices?.some(service => service.categoryId === selectedCategory)
      )
    : professionals;
  
  if (!filteredProfessionals?.length) {
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
            <p className="text-gray-600">
              {selectedCategory 
                ? 'No professionals found for this category. Please try another category.'
                : 'No professionals found. Please try again later.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayedProfessionals = showAll ? filteredProfessionals : filteredProfessionals.slice(0, 9);
  const hasMore = filteredProfessionals.length > 9;

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
          {displayedProfessionals.map((professional) => (
            <ProfessionalListItem
              key={professional.id}
              {...professional}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
