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
    <footer className="bg-[linear-gradient(180deg,rgb(10,122,255)_10%,rgb(86,181,254)_100%)] text-white pt-28">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">TMG</h3>
            <p className="text-white/80">
              Connecting homeowners with trusted local service professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/80">
                Email: info@trymyguys.com
              </li>
              <li className="text-white/80">
                Phone: (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} TMG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
