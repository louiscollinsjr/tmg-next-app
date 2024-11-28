'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './AuthButton';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4">
      {/* Header Bar - Always Visible */}
      <div className={`backdrop-blur-md bg-transparent relative z-[60] ${isMenuOpen ? 'bg-zinc-100' : ''}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
          <div className="flex items-center h-[64px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-burnt-orange text-3xl font-bold hover:text-gray-700 transition-colors">
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

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-auto">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 relative w-[20px] h-[20px]"
                aria-label="Toggle menu"
              >
                <span className={`absolute left-2 block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                <span className={`absolute left-2 block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-2 block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 z-50 bg-zinc-100 px-8 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start h-screen pt-20">
          <Link
            href="/find-professionals"
            onClick={handleLinkClick}
            className="block w-full py-4 text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100"
          >
            Find Professionals
          </Link>
          <Link
            href="/explore-designs"
            onClick={handleLinkClick}
            className="block w-full py-4 text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100"
          >
            Explore Designs
          </Link>
          <div className="w-full py-4 border-b border-gray-100">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
