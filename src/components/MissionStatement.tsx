import React from 'react';
import Link from 'next/link';

const MissionStatement = () => {
  return (
    <section className="bg-primary/80 backdrop-blur-sm py-12">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            Your home, time, and money matter.
          </h1>
          <p className="text-lg font-light text-white mb-8 max-w-3xl mx-auto">
            We&apos;re on a mission to transform how homeowners find and connect with trusted home service professionals.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/get-started"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-800 rounded-lg transition-all duration-200 group"
            >
              <span className="text-sm font-medium">Get started with your Project</span>
              <svg 
                className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
