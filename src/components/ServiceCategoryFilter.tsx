"use client";

import React, { useRef, useState, useEffect } from 'react';
import { 
  PaintBrush,
  Wrench,
  Tree,
  Pipe,
  Lightning,
  Broom,
  Bug,
  Storefront,
  Icon,
  Fan,
  Toolbox,
  Couch,
  Warehouse
} from "@phosphor-icons/react";

interface ServiceCategoryFilterProps {
  categories: Array<{
    slug: string;
    name: string;
  }>;
  onCategorySelect?: (slug: string | null) => void;
}

export default function ServiceCategoryFilter({ categories, onCategorySelect }: ServiceCategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

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

  const getIconForCategory = (slug: string): Icon => {
    const iconMap: { [key: string]: Icon } = {
      // Essential Services
      'electrical': Lightning,
      'plumbing': Pipe,
      'hvac': Fan,
      
      // Major Renovations
      'construction-remodeling': Toolbox,
      'interior-design-decor': Couch,
      
      // Maintenance
      'cleaning-maintenance': Broom,
      'landscaping-outdoor': Tree,
      'handyman-services': Wrench,
      
      // Specialty Services
      'painting-wall-treatments': PaintBrush,
      'pest-control': Bug,
      
      // Default
      'other': Storefront,
    };
    return iconMap[slug] || Storefront;
  };

  return (
    <div className="relative mx-auto" style={{ width: '980px' }}>
      {/* Left gradient overlay */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-zinc-50 to-transparent z-10" />
      )}

      {/* Right gradient overlay */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-zinc-50 to-transparent z-10" />
      )}

      {/* Left scroll button */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide h-24 py-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex space-x-10 px-20 h-full items-center">
          {/* All Professionals category */}
          <button
            onClick={() => {
              setSelectedCategory(null);
              onCategorySelect?.(null);
            }}
            className={`text-xs whitespace-nowrap px-2 text-gray-600 hover:text-gray-900 flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === null ? 'text-gray-900' : ''}`}
          >
            <div className="flex flex-col items-center gap-2">
              {React.createElement(Warehouse, {
                size: 26,
                className: `${selectedCategory === null ? 'text-gray-900' : 'text-gray-800'}`
              })}
              <span className={`${selectedCategory === null ? 'underline decoration-2 underline-offset-[12px] decoration-black' : 'hover:underline hover:decoration-2 hover:underline-offset-[12px] hover:decoration-black'}`}>
                All Professionals
              </span>
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => {
                setSelectedCategory(category.slug);
                onCategorySelect?.(category.slug);
              }}
              className={`text-xs whitespace-nowrap px-2 text-gray-600 hover:text-gray-900 flex flex-col items-center gap-2 cursor-pointer ${selectedCategory === category.slug ? 'text-gray-900' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                {React.createElement(getIconForCategory(category.slug), {
                  size: 26,
                  className: `${selectedCategory === category.slug ? 'text-gray-900' : 'text-gray-800'}`
                })}
                <span className={`${selectedCategory === category.slug ? 'underline decoration-2 underline-offset-[12px] decoration-black' : 'hover:underline hover:decoration-2 hover:underline-offset-[12px] hover:decoration-black'}`}>
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
