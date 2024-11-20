import React from 'react';

const CommunityPowerCTA = () => {
  return (
    <section className="py-24 font-roboto">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="text-sm font-normal tracking-[0.1em] mb-4 text-gray-800">
              Our Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-6">
              Community-powered home services
            </h2>
            <p className="text-lg font-light text-gray-800 mb-8">
              Experience the power of trusted recommendations from your community. Our platform leverages local insights and real experiences to connect you with the most reliable home service professionals in your area.
            </p>
            <div className="mt-10">
              <a
                href="/explore-community"
                className="inline-flex items-center text-black hover:text-gray-700 underline underline-offset-4 transition duration-150 ease-in-out group"
              >
                Join Our Community
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
              </a>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            {/* <img
              src="/images/community.jpg"
              alt="Community Platform"
              className="absolute inset-0 w-full h-full object-cover"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPowerCTA;
