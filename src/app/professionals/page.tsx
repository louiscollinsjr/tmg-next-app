'use client';

import NavigationWrapper from '@/components/NavigationWrapper';
import ProfessionalWaitlistModal from '@/components/ProfessionalWaitlistModal';
import { useState } from 'react';

export default function ProfessionalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-100">
      <NavigationWrapper forcePrelaunch={true} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Find Jobs & Get Paid Fast
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Join our network of trusted professionals. Get matched with quality clients, 
                manage your business, and receive payments quickly and securely.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full bg-burnt-orange px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-burnt-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burnt-orange"
                >
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Benefit 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-burnt-orange mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Competitive Pay</h3>
            <p className="text-gray-600">
              Set your own rates and earn what you're worth. Get paid quickly and securely.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-burnt-orange mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Clients</h3>
            <p className="text-gray-600">
              Connect with verified clients looking for quality professionals like you.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-burnt-orange mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Grow Your Business</h3>
            <p className="text-gray-600">
              Build your reputation with reviews and showcase your best work.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-burnt-orange text-2xl font-bold mb-2">1</div>
              <h3 className="font-bold mb-2">Join Waitlist</h3>
              <p className="text-gray-600">Sign up to be one of our first professionals</p>
            </div>
            <div>
              <div className="text-burnt-orange text-2xl font-bold mb-2">2</div>
              <h3 className="font-bold mb-2">Complete Profile</h3>
              <p className="text-gray-600">Add your skills, experience, and portfolio</p>
            </div>
            <div>
              <div className="text-burnt-orange text-2xl font-bold mb-2">3</div>
              <h3 className="font-bold mb-2">Get Verified</h3>
              <p className="text-gray-600">We verify your credentials and background</p>
            </div>
            <div>
              <div className="text-burnt-orange text-2xl font-bold mb-2">4</div>
              <h3 className="font-bold mb-2">Start Earning</h3>
              <p className="text-gray-600">Connect with clients and grow your business</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Join Professional Waitlist
          </button>
          <p className="mt-4 text-gray-500 text-sm">
            Limited spots available for early access
          </p>
        </div>
      </div>

      <ProfessionalWaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
