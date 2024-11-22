'use client';

import { useState } from 'react';
import ProfessionalCard from './ProfessionalCard';
import ProfessionalListItem from './ProfessionalListItem';
import { DisplayProfessional } from '@/types/professional';
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs';

interface ProfessionalsGridProps {
  professionals: DisplayProfessional[];
  selectedCategory: string | null;
}

export default function ProfessionalsGrid({ professionals, selectedCategory }: ProfessionalsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter professionals based on selected category
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Featured Professionals</h2>
            <p className="text-gray-500">Discover top-rated professionals in your area</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Grid view"
              >
                <BsGrid3X3GapFill className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="List view"
              >
                <BsListUl className="w-5 h-5" />
              </button>
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
        </div>

        {/* Professionals Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {displayedProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
            {displayedProfessionals.map((professional) => (
              <ProfessionalListItem
                key={professional.id}
                {...professional}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
