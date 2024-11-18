import React from 'react';

const ProfessionalCTA = () => {
  return (
    <section className=" py-24">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.2em] mb-6 text-white/90">
            tmgPRO
          </div>
          <h2 className="text-xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Grow Your Business with tmgPRO
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our network of elite professionals and get direct access to high-quality leads, premium tools, and a thriving community.
          </p>
          <a
            href="/join-pro"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-black hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
          >
            Join TMG Pro
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCTA;
