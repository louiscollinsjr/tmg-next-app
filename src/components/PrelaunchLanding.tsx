'use client';

import { useState } from 'react';
import WaitlistModal from './WaitlistModal';
import AppStoreButtons from './AppStoreButtons';

const backgroundIcons = [
  'broom', 'bug', 'couch', 'fan', 'lightning',
  'paint-brush-broad', 'pipe', 'screwdriver', 'toolbox',
  'tree', 'wrench'
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-10">
          <div className="absolute  inset-0 grid grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-2 opacity-[0.05]">
            {Array.from({ length: 48 }).map((_, index) => {
              const iconName = backgroundIcons[index % backgroundIcons.length];
              return (
                <div
                  key={index}
                  className="w-6 h-6 transform rotate-12"
                  style={{
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                >
                  <img
                    src={`/filterSVGs/${iconName}.svg`}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto p-8 sm:px-6 lg:px-8 min-h-[calc(80vh-64px)] text-left sm:text-center flex flex-col justify-center font-roboto ">
          {/* Main Content */}
          <div className=" mx-auto lg:~py-32/64">
            <div className="flex items-center justify-start sm:justify-center gap-2 mb-4 text-gray-600 pb-3">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Zm0 2.25h.008v.008h-.008v-.008Z"
                />
              </svg>
              <span className="text-xs md:text-sm tracking-wider">
                Launching early 2025
              </span>
            </div>
            <h1 className="~text-5xl/7xl  md:~text-6xl/9xl tracking-tight font-bold text-slate-800 mb-4 w-[80%] md:w-full">
              Find <span className="bg-gradient-to-r from-orange-gradient-start to-orange-gradient-end bg-clip-text text-transparent">local</span>, <span className="inline-block bg-gradient-to-r from-orange-gradient-start to-orange-gradient-end bg-clip-text text-transparent">trusted tradespeople</span>{" "}in minutes
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center ~px-5/10 ~py-4/8 ~text-base/3xl md:~text-3xl/5xl font-medium text-white bg-burnt-orange rounded-full hover:bg-gray-700 transition-colors w-fit tracking-wider "
              >
                Join waitlist{" "}

              </button>
            </div>
            <div className="sm:mt-16">
              <AppStoreButtons center />
            </div>
          </div>
        </main>
      </div>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
