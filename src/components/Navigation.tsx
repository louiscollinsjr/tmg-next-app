'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import AuthButton from './AuthButton';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CaretDown } from '@phosphor-icons/react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4 pb-8">
      {/* Header Bar - Always Visible */}
      <div className={`backdrop-blur-sm bg-zinc-100/30 py-8 relative z-[60] ${isMenuOpen ? 'bg-zinc-100' : ''}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
          <div className="flex items-center h-[96px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="relative z-[100] block">
                <Image 
                  src="/images/tmg_flags.png" 
                  alt="TryMyGuys"
                  width={150}
                  height={96}
                  className="w-auto h-24 select-none"
                  style={{
                    imageRendering: 'auto',
                    shapeRendering: 'auto'
                  }}
                  priority
                />
              </Link>
            </div>
            
            
            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex flex-grow justify-center">
              <div className="flex items-center space-x-10">
                {/* <Link href="/app/find-professionals" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Find Professionals
                </Link> */}
                <Link href="/app/explore-designs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Explore Designs
                </Link>
                
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                    Hire a tradesperson
                    <CaretDown size={12} weight="bold" className="text-gray-400" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/app/find-professionals"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Browse tradespersons
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/app/submit-project"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Submit a project
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/app/hiring-guide"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Hiring on TryMyGuys
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Link href="/app/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Find Jobs
                </Link>
                <Link href="/app/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </Link>
                <div className="ml-auto text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <AuthButton />
              </div>
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
            href="/app/find-professionals"
            onClick={handleLinkClick}
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
          >
            Find Professionals
          </Link>
          <Link
            href="/app/explore-designs"
            onClick={handleLinkClick}
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
          >
            Explore Designs
          </Link>
          <Link
            href="/app/help"
            onClick={handleLinkClick}
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
          >
            Help Center
          </Link>
          <div className="w-full py-4 border-b border-gray-100">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
