'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './AuthButton';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[44px]">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white text-lg font-bold hover:text-white transition-colors">
              tmg.
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-white">
              <Link href="/explore-designs" className="text-xs hover:text-gray-200 transition-colors">
                Explore Designs
              </Link>
              <Link href="/find-professionals" className="text-xs hover:text-gray-200 transition-colors">
                Find Professionals
              </Link>
              <Link href="/start-project" className="text-xs hover:text-gray-200 transition-colors">
                Start a Project
              </Link>
            </div>
          </div>

          {/* Auth Button and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <AuthButton />
            </div>
            <Link
              href="/join-as-pro"
              className="bg-[#0071e3] text-white text-xs font-semibold px-4 py-1 rounded-full hover:bg-[#0077ed] transition-colors"
            >
              Join as a Pro
            </Link>
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#d1d1d1] hover:text-white transition-colors"
              >
                <Image
                  src="/menu.svg"
                  alt="Menu"
                  width={18}
                  height={18}
                  className="opacity-80 hover:opacity-100"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/explore-designs"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Explore Designs
            </Link>
            <Link
              href="/find-professionals"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Find Professionals
            </Link>
            <Link
              href="/start-project"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/join-as-pro"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Join as a Pro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
