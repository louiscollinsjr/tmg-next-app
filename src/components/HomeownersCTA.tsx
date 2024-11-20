import React from 'react';

const HomeownersCTA = () => {
  return (
    <section className="py-24 font-roboto">
      <div className="max-w-[61.25rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="text-sm font-normal tracking-[0.1em] mb-4 text-gray-800">
              For Homeowners
            </div>
            <h2 className="text-3xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-6">
              Transform Your Home with Confidence
            </h2>
            <p className="text-lg font-light text-gray-800 mb-8">
              Connect with trusted local professionals for your home improvement projects. Get expert advice, competitive quotes, and peace of mind.
            </p>
            {/* <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-3 text-lg text-gray-600">Verified Professional Network</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-3 text-lg text-gray-600">Free Project Consultations</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-3 text-lg text-gray-600">Satisfaction Guaranteed</p>
              </div>
            </div> */}
            <div className="mt-10">
              <a
                href="/get-started"
                className="inline-flex items-center text-black hover:text-gray-700 underline underline-offset-4 transition duration-150 ease-in-out group"
              >
                Get Started
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
              src="/images/home-improvement.jpg"
              alt="Home Improvement"
              className="absolute inset-0 w-full h-full object-cover"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeownersCTA;
