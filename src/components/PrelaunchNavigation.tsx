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
      <div className="mx-auto max-w-7xl px-[22px] ~pt-6/8">
        <div className="flex h-24 justify-between ~pt-2/12">
          {/* Left side */}
          <div className="flex items-center pt-2">
            <Link href="/" className="~text-2xl/4xl font-bold font-luckiest-guy tracking-wide text-burnt-orange transition-colors">
              TryMyGuys
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center pr-2">
            {isProfessionalsPage ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="gradient-border-button inline-flex items-center  ~px-4/8 ~py-2/4 ~text-base/2xl tracking-normal font-bold rounded-full text-black bg-zinc-200 hover:bg-zinc-300 transition-all"
              >
                Join waitlist
              </button>
            ) : (
              <Link
                href="/professionals"
                className="gradient-border-button inline-flex items-center  ~px-4/8 ~py-2/4 ~text-sm/2xl font-bold tracking-normal rounded-full text-black bg-zinc-200 hover:bg-zinc-300 transition-all"
              >
                For Tradespeople
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
