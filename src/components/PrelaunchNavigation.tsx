'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ProfessionalWaitlistModal from './ProfessionalWaitlistModal';
import Image from 'next/image';

export default function PrelaunchNavigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isProfessionalsPage = pathname === '/professionals';

  return (
    <div className="bg-zinc-100 max-w-screen-8xl">
      <div className="mx-auto ~px-6/56 ~pt-6/8">
        <div className="flex h-24 justify-between ~pt-2/12">
          {/* Left side */}
          <div className="flex items-center">
          <Link href="/" className="relative z-[100] block">
                <Image 
                  src="/images/tmg_flags.png"
                  alt="TryMyGuys"
                  width={240}
                  height={96}
                  className="w-auto ~h-20/32 select-none"
                  priority
                />
              </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center pr-2">
            {isProfessionalsPage ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="gradient-border-button inline-flex items-center  ~px-4/8 ~py-2/4 ~text-base/3xl md:~text-3xl/4xl tracking-wide font-bold rounded-full text-slate-800 bg-zinc-200 hover:bg-zinc-300 transition-all font-roboto"
              >
                Join waitlist
              </button>
            ) : (
              <Link
                href="/professionals"
                className="gradient-border-button inline-flex items-center  ~px-4/8 ~py-3/4 ~text-sm/2xl md:~text-2xl/4xl font-bold tracking-normal rounded-full text-slate-800 bg-zinc-200 hover:bg-zinc-300 transition-all font-roboto"
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
