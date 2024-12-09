import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';
import Link from 'next/link';
import FooterSignInButton from './FooterSignInButton';

export default function PrelaunchFooter() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:hello@trymyguys.com';
  };

  return (
    <footer className="bg-zinc-100 text-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-8 sm:px-[22px]">
        {/* Row 1 - Logo, Social Icons, and Contact */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 pb-8 border-b border-gray-200">
          {/* Logo and Social Icons */}
          <div>
            <div className="~text-xl/3xl font-bebas-neue font-bold tracking-wide text-burnt-orange mb-4">
              TRYMYGUYS
            </div>
            <div className="flex space-x-4">
              <a href="https://instagram.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://bsky.app/profile/trymyguys.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <SiBluesky className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/trymyguys" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              {/* <a href="https://linkedin.com/company/trymyguys" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-right">
            <h3 className=" mb-2 ~text-sm/2xl">Any questions?</h3>
            <a 
              href="mailto:hello@trymyguys.com" 
              onClick={handleEmailClick}
              className="text-gray-600 font-semibold ~text-base/3xl hover:text-gray-800 transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Row 2 - Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 ~text-xs/2xl">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TryMyGuys. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <p>|</p>
            <Link href="/legal" className="text-gray-500 hover:text-gray-700 transition-colors">
              Terms of Use
            </Link>
            <p>|</p>
            <Link href="/legal" className="text-gray-500 hover:text-gray-700 transition-colors">
              Legal
            </Link>
            <p>|</p>
            <FooterSignInButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
