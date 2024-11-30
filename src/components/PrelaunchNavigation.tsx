'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ProfessionalWaitlistModal from './ProfessionalWaitlistModal';

export default function PrelaunchNavigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isProfessionalsPage = pathname === '/professionals';

  return (
    <div className="bg-zinc-100">
      <div className="mx-auto max-w-5xl px-[22px] sm:px-6 lg:px-8">
        <div className="flex h-24 justify-between py-8">
          {/* Left side */}
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold font-luckiest-guy tracking-wide text-burnt-orange transition-colors">
              TryMyGuys
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center pr-2">
            {isProfessionalsPage ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="gradient-border-button inline-flex items-center px-6 py-3 text-base md:text-lg tracking-normal font-bold rounded-full text-black bg-zinc-200 hover:bg-zinc-300 transition-all"
              >
                Join waitlist
              </button>
            ) : (
              <Link
                href="/professionals"
                className="gradient-border-button inline-flex items-center px-4 py-3 text-base md:text-lg font-bold tracking-normal rounded-full text-black bg-zinc-200 hover:bg-zinc-300 transition-all"
              >
                For Professionals
              </Link>
            )}
          </div>
        </div>
      </div>

      <ProfessionalWaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}