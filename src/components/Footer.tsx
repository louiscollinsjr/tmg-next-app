'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [location, setLocation] = useState('San Francisco, CA, USA'); // Placeholder location

  // TODO: Implement actual geolocation
  useEffect(() => {
    // Geolocation implementation will go here
  }, []);

  return (
    <footer className="bg-[linear-gradient(180deg,rgb(10,122,255)_0%,rgb(60,130,255)_100%)] text-white pt-16 text-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Useful Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* About TMG */}
          <div>
            <h3 className="font-semibold mb-4">About TMG</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Homeowners */}
          <div>
            <h3 className="font-semibold mb-4">For Homeowners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white hover:underline transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/join" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Join Our Network
                </Link>
              </li>
              <li>
                <Link href="/pro-resources" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/pro-success" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/pro-tools" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Pro Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Safety Center
                </Link>
              </li>
              <li>
                <a href="mailto:support@trymyguys.com" className="text-white/80 hover:text-white hover:underline transition-colors">
                  support@trymyguys.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Legal & Info */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TMG. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-4 mb-4 md:mb-0">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/terms" className="hover:text-white hover:underline">
                Terms of Use
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/legal" className="hover:text-white hover:underline">
                Legal
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/sitemap" className="hover:text-white hover:underline">
                Site Map
              </Link>
            </div>

            {/* Location */}
            <div>
              {location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
