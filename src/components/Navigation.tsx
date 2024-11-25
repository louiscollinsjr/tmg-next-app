'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './AuthButton';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
        <div className="flex items-center h-[64px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-[#f93a16] text-3xl font-bold hover:text-gray-700 transition-colors">
              tmg.
            </Link>
          </div>
          
          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-10">
              <Link href="/find-professionals" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Find Professionals
              </Link>
              <Link href="/explore-designs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Explore Designs
              </Link>
            </div>
          </div>

          {/* Auth Button */}
          <div className="flex-shrink-0">
            <div className="md:block">
              <AuthButton />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2"
            >
              <Image
                src="/menu.svg"
                alt="Menu"
                width={20}
                height={20}
                className="opacity-80 hover:opacity-100"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/find-professionals"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Find Professionals
            </Link>
            <Link
              href="/explore-designs"
              className="block px-3 py-2 text-[#d1d1d1] text-sm hover:text-white transition-colors"
            >
              Explore Designs
            </Link>
            <div className="px-3 py-2">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
