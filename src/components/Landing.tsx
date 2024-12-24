'use client'

import ClientProfessionals from "@/components/ClientProfessionals";
import { ProfessionalsData } from '@/types/professional';
import SearchBox from './SearchBox';

interface LandingProps {
  initialData: ProfessionalsData;
}

export default function Landing({ initialData }: LandingProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-[22px] py-24 pt-64">
          <div className="text-center">
            <h1 className="font-roboto text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
              Find Trusted Professionals
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-roboto">
              Connect with experienced, community-recommended professionals for your home improvement projects
            </p>
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-[22px] pb-24">
        <ClientProfessionals 
          professionals={initialData.professionals}
          categories={initialData.categories}
        />
      </section>
    </div>
  );
}
