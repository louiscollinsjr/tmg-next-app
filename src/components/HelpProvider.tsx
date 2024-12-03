'use client';

import { useState } from 'react';
import { MagnifyingGlass } from "@phosphor-icons/react";
import Link from 'next/link';

interface HelpProviderProps {
  userName?: string;
}

export default function HelpProvider({ userName }: HelpProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-roboto">
          {userName ? `Hi ${userName}, how can we help you?` : 'Hey, how can we help?'}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search how-to's and more..."
            className="w-full px-12 py-4 text-lg border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <MagnifyingGlass size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Guides Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Homeowner Guide */}
        <Link href="/help/homeowner-guide" className="group">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Guide for Homeowners
            </h3>
            <p className="text-gray-600">
              Learn how to get the most out of our platform, from finding the right professional to managing your projects.
            </p>
          </div>
        </Link>

        {/* Professional Guide */}
        <Link href="/help/professional-guide" className="group">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Guide for Professionals
            </h3>
            <p className="text-gray-600">
              Everything you need to know about growing your business and connecting with clients on our platform.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
