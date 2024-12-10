'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function PostlaunchNavigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center h-[64px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="relative z-[100] block">
                <Image 
                  src="/images/tmg_flags.png"
                  alt="TryMyGuys"
                  width={240}
                  height={96}
                  className="w-auto h-12 select-none"
                  priority
                />
              </Link>
            </div>

            {/* Main navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/find-pros"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-burnt-orange"
              >
                Find Pros
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-burnt-orange"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-burnt-orange"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-burnt-orange"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-burnt-orange"
                >
                  Sign in
                </button>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
