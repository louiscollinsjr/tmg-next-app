'use client';

import ServiceCategoryGrid from '@/components/ServiceCategoryGrid';
import SearchBox from '@/components/SearchBox';
import Image from 'next/image';

export default function Landing() {
  return (
    <section className="relative isolate bg-zinc-100 pt-56">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:grid lg:grid-cols-12 gap-8 lg:px-0 lg:py-0 rounded-3xl bg-white -500">
        <div 
          className="lg:col-span-5 h-full rounded-3xl rounded-r-3xl relative p-12 overflow-hidden"
          style={{
            backgroundImage: "url('/images/mattwardgroup_Current_Market_Trends_Median_Hom_in_Gainesville_F.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay */}
          <div className="relative z-10 min-h-[470px]">
            <Image 
              src="/images/tmg_flags.png"
              alt="TryMyGuys"
              width={240}
              height={96}
              className="w-auto h-12 select-none"
              priority
            />
            <h1 className="text-7xl font-semibold tracking-tight text-white sm:text-5xl font-playfair-display mt-20">
              Your Home, Your Project, Our Experts.
            </h1>
            <p className="mt-6 text-sm leading-6 w-[85%] text-white/80 py-2">
              Connect with skilled professionals for all your home service needs. Quality work, reliable service, and peace of mind - all in one place.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/app/start-project"
                className="rounded-xl bg-zinc-100 px-8 py-4 text-base font-semibold text-[#013553] shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white font-lato"
              >
                Start your project
              </a>
              <a href="/app/about" className="text-sm font-normal leading-6 text-white/80 hover:text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 mt-16 lg:mt-0">
          <div className="relative overflow-hidden rounded-xl p-8 shadow-sm w-full pt-24">
           
            <h2 className="text-2xl font-medium mb-8 mt-12 text-gray-900">What are you looking for?</h2>
            <div className="w-full py-8">
              <ServiceCategoryGrid 
                onCategorySelect={(slug) => console.log(slug)}
              />
            </div>
            <SearchBox /> 
          </div>
        </div>
      </div>
    </section>
  );
}