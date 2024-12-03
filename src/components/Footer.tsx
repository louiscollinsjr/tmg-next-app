'use client';

import Link from 'next/link';
import { memo } from 'react';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';

// Memoize the entire footer with a custom comparison function
const Footer = memo(
  function Footer() {
    return (
      <footer className="bg-zinc-100 text-gray-800 pt-24 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
          {/* Top Row - Useful Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
            {/* About TMG */}
            <div className="lg:col-span-3">
              <h3 className="font-bold mb-4 text-3xl">tmg.</h3>
              <p className="text-gray-800 mb-4">
                Connecting homeowners with trusted professionals.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-gray-800/80 hover:text-white transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://bsky.app/profile/trymyguys.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-800/80 hover:text-white transition-colors">
                  <SiBluesky className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-gray-800/80 hover:text-white transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/company/trymyguys" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Columns Container */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:justify-items-center">
              {/* For Homeowners & Support */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">For Homeowners</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Our Services
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Reviews
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Safety Center
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* For Professionals & Contact */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">For Professionals</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Join Our Network
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Pro Tools
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/contact" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <a href="mailto:support@trymyguys.com" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
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
                    <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                      Kitchen & Dining
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                      Living Rooms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                      Bed & Bath
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                      Outdoor Spaces
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700/80 hover:text-white hover:underline transition-colors">
                      Bar & Wine
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row - Legal & Info */}
          <div className="border-t border-gray-700/20 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-700/80">
              <div className="mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} tmg. All rights reserved.
              </div>

              <div className="flex flex-wrap justify-center gap-x-4 mb-4 md:mb-0">
                <Link href="/privacy" className="hover:text-gray-800 hover:underline">Privacy Policy</Link>
                <span className="hidden md:inline">|</span>
                <Link href="/terms" className="hover:text-gray-800 hover:underline">Terms of Use</Link>
                <span className="hidden md:inline">|</span>
                <Link href="/legal" className="hover:text-gray-800 hover:underline">Legal</Link>
              </div>

              <div>United States</div>
            </div>
          </div>
        </div>
      </footer>
    );
  },
  // Custom comparison function - always return true since Footer has no props
  () => true
);

export default Footer;
