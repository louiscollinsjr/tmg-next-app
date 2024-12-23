'use client';

import ProfessionalHero from '@/components/ProfessionalHero';
import PrelaunchScheduling from '@/components/PrelaunchScheduling';
import PricingTiers from '@/components/PricingTiers';
import AppStoreButtons from '@/components/AppStoreButtons';
import ProfessionalWaitlistModal from '@/components/ProfessionalWaitlistModal';
import { useState } from 'react';

export default function ProfessionalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-100 max-screen-w-8xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <ProfessionalHero />
        
        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-burnt-orange">Professional Platform</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to grow your business
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our platform provides all the tools and features you need to manage and grow your professional services business.
              </p>
            </div>
          </div>
        </div>

        {/* Prelaunch Scheduling */}
        <PrelaunchScheduling onOpenModal={() => setIsModalOpen(true)} />
        
        {/* Pricing Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base font-semibold leading-7 text-burnt-orange">Pricing</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Simple, transparent pricing
              </p>
            </div>
            <PricingTiers />
          </div>
        </div>

        {/* App Store Section */}
        <div className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-burnt-orange">Download Now</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get started today
              </p>
              <div className="mt-10 flex justify-center">
                <AppStoreButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfessionalWaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}