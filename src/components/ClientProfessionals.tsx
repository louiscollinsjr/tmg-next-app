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
      <ServiceCategoryFilter 
        categories={categories} 
        onCategorySelect={setSelectedCategory}
      />
      <ProfessionalsGrid 
        professionals={professionals} 
        selectedCategory={selectedCategory}
      />
    </>
  );
}
