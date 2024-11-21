"use client";

import React, { useRef } from 'react';

interface ServiceCategoryFilterProps {
  categories: Array<{
    slug: string;
    name: string;
  }>;
}

export default function ServiceCategoryFilter({ categories }: ServiceCategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mx-auto" style={{ width: '980px' }}>
      {/* Left scroll button */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide h-12"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex space-x-8 px-8 h-full items-center">
          {categories.map((category) => (
            <button
              key={category.slug}
              className="text-sm whitespace-nowrap px-2 pb-4 text-gray-600 hover:underline hover:decoration-2 hover:underline-offset-[12px] hover:decoration-black"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}