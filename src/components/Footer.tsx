'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';

export default function Footer() {
  const [location, setLocation] = useState('San Francisco, CA, USA'); // Placeholder location

  // TODO: Implement actual geolocation
  useEffect(() => {
    // Geolocation implementation will go here
  }, []);

  return (
    <footer className="bg-[linear-gradient(180deg,rgb(10,122,255)_0%,rgb(60,130,255)_100%)] text-white pt-16 text-xs">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Useful Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* About TMG */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-3xl">tmg.</h3>
            <p className="text-white/80 mb-4">
              Connecting homeowners with trusted professionals for exceptional home improvements.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://bsky.app/profile/trymyguys.bsky.social" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <SiBluesky className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/trymyguys" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services & Support */}
          <div className="space-y-8">
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
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-white/80 hover:text-white hover:underline transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-white/80 hover:text-white hover:underline transition-colors">
                    Safety Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Professionals & Resources */}
          <div className="space-y-8">
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
                  <Link href="/pro-tools" className="text-white/80 hover:text-white hover:underline transition-colors">
                    Pro Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white hover:underline transition-colors">
                    Contact Us
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

          {/* Explore Designs */}
          <div>
            <h3 className="font-semibold mb-4">Explore Designs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/designs/kitchen-dining" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link href="/designs/living-rooms" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Living Rooms
                </Link>
              </li>
              <li>
                <Link href="/designs/bed-bath" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Bed & Bath
                </Link>
              </li>
              <li>
                <Link href="/designs/outdoor-spaces" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Outdoor Spaces
                </Link>
              </li>
              <li>
                <Link href="/designs/bar-wine" className="text-white/80 hover:text-white hover:underline transition-colors">
                  Bar & Wine
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Legal & Info */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} tmg. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 mb-4 md:mb-0">
              <Link href="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link>
              <span className="hidden md:inline">|</span>
              <Link href="/terms" className="hover:text-white hover:underline">Terms of Use</Link>
              <span className="hidden md:inline">|</span>
              <Link href="/legal" className="hover:text-white hover:underline">Legal</Link>
            </div>

            <div>{location}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
