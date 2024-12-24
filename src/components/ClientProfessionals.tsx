'use client';

import { useState } from 'react';
import ServiceCategoryFilter from './ServiceCategoryFilter';
import ProfessionalsGrid from './ProfessionalsGrid';
import { DisplayProfessional } from '@/types/professional';

interface ClientProfessionalsProps {
  professionals: DisplayProfessional[];
  categories: Array<{ slug: string; name: string; }>;
}

export default function ClientProfessionals({ professionals, categories }: ClientProfessionalsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 sm:px-[22px]'>
      <ServiceCategoryFilter 
        categories={categories} 
        onCategorySelect={setSelectedCategory}
      />
      </div>
    
      <div className='max-w-5xl mx-auto sm:px-[22px] py-8'>
      <ProfessionalsGrid 
        professionals={professionals} 
        selectedCategory={selectedCategory}
      />
      </div>
     
    </>
  );
}
