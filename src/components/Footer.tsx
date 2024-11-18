'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    // In a real app, you'd want to use a geolocation service
    // This is just a placeholder - you'll need to implement actual geolocation
    setLocation('San Francisco, CA');
  }, []);

  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-sm">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About TMG</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/press" className="hover:underline">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Homeowners</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="hover:underline">How It Works</Link></li>
              <li><Link href="/safety" className="hover:underline">Safety Center</Link></li>
              <li><Link href="/reviews" className="hover:underline">Customer Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-3">
              <li><Link href="/pro" className="hover:underline">Join as Pro</Link></li>
              <li><Link href="/success" className="hover:underline">Success Stories</Link></li>
              <li><Link href="/pro-resources" className="hover:underline">Pro Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="hover:underline">Help Center</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/feedback" className="hover:underline">Give Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-[#d2d2d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
            {/* Copyright - Left */}
            <div className="order-2 md:order-1 md:flex-1">
              Copyright 2024 TryMyGuys.com All rights reserved.
            </div>

            {/* Center Links */}
            <div className="order-1 md:order-2 flex flex-wrap justify-center gap-x-6">
              <Link href="/privacy" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/terms" className="hover:underline whitespace-nowrap">Terms of Use</Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/legal" className="hover:underline whitespace-nowrap">Legal</Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link href="/sitemap" className="hover:underline whitespace-nowrap">Site Map</Link>
            </div>

            {/* Location - Right */}
            <div className="order-3 md:text-right md:flex-1">
              {location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
