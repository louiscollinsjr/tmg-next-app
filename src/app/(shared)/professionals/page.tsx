'use client';

import NavigationWrapper from '@/components/NavigationWrapper';
import ProfessionalWaitlistModal from '@/components/ProfessionalWaitlistModal';

import AppStoreButtons from '@/components/AppStoreButtons';
import { useState } from 'react';

export default function ProfessionalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-100">
      
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative isolate px-6">
          <div className="mx-auto max-w-4xl py-8 md:pt-24">
            <div className="text-left sm:text-center flex flex-col items-start sm:items-center">
              <h1 className="text-5xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-bold tracking-tight leading-[1.15] sm:leading-[1.1] text-gray-900"> 
              Your go-to app for <span className="text-burnt-orange">quality jobs, on-demand</span> 
              </h1>
              <p className="mt-6 text-base leading-2 text-gray-900 w-[80%]">
              Become part of our trusted professional network. Connect with quality clients, streamline your business management, and enjoy fast, secure payments.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-x-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full bg-burnt-orange px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-burnt-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burnt-orange"
                >
                  Join waitlist
                </button>
                <div className="mt-4 sm:mt-0 pl-2 sm:pl-8 sm:border-l border-gray-200">
                  <div className="text-xs text-gray-600">
                    <p className='font-bold text-left'>Launching early 2025</p>
                    <p className="text-left">No sign up fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    

     
        {/* CTA Section */}
        {/* <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-full text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Join waitlist
          </button>
         
        </div> */}
      </div>

      {/* Free to Join Section */}
      <div className="px-[22px] md:~mt-16/32">
        <div className="max-w-5xl mx-auto md:px-[22px]">
          <div className="bg-gradient-to-br from-burnt-orange to-[rgb(255,88,22)] text-white py-20 rounded-3xl">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-4xl font-bold mb-6 font-tiro-bangla tracking-wide">
                  Free to join. Easy to use.
                </h2>
                <p className="text-sm sm:text-sm max-w-sm mx-auto">
                  Unlike other platforms, with TryMyGuys there&#39;s no sign-up cost, no
                  service fees on completed jobs. Oh, and you get your first month free.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center justify-center md:w-[70%] mx-auto">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <div className="font-bold text-base mb-2">Download</div>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="font-bold text-base  mb-2">Find jobs</div>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="font-bold text-base mb-2">Get paid</div>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-bold text-base mb-2">Easy!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 md:mt-16">
        <div className="container mx-auto max-w-5xl p-[22px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
              <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008H16.5v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Zm0 2.25h.008v.008h-.008v-.008Z"
            />
          </svg>
                <span className="text-gray-600">Launching early 2025</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black tracking-tight">
                Sign up today to get early access to <span className="text-burnt-orange">local jobs</span>
              </h2>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-burnt-orange text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                Join waitlist
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg> */}
              </button>

              <AppStoreButtons />
            </div>

            <div className="flex-1">
            
            </div>
          </div>
        </div>
      </div>

      <ProfessionalWaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="pt-32"></div>
     
    </main>
  );
}