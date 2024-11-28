'use client';

import Link from 'next/link';
import { useState } from 'react';
import WaitlistModal from './WaitlistModal';

export default function PrelaunchNavigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-10 lg:px-12">
        <div className="flex justify-between">
          <div className="flex items-center h-[80px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-burnt-orange text-2xl md:text-3xl font-luckiest-guy hover:text-gray-700 transition-colors">
                TryMyGuys
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center pr-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-3 border border-black text-base md:text-lg tracking-tighter font-bold rounded-full text-black bg-zinc-100 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              For Profesionals
            </button>
          </div>
        </div>
      </div>

      <WaitlistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}
