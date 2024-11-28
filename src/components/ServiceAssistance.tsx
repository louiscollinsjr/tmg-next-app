'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    businessName: "Elite Home Moving Services",
    location: "Frisco, TX",
    image: "/placeholder1.png"
  },
  {
    id: 2,
    businessName: "Modern Living Solutions",
    location: "Dallas, TX",
    image: "/placeholder2.png"
  },
  {
    id: 3,
    businessName: "Premium Home Care",
    location: "Sacshe, TX",
    image: "/placeholder3.png"
  }
];

export default function ServiceAssistance() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="py-16 font-open-sans">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-semibold max-w-4xl mx-auto text-gray-900 mb-4 flex flex-col gap-2 tracking-tight">
            <span>Need home services?</span>
            <span>TryMyGuys</span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center">
              <div className="w-[280px] h-[280px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.businessName}
                  width={280}
                  height={280}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-900">{service.businessName}</h3>
                <p className="text-xs text-gray-500">{service.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center text-2xl text-gray-600 max-w-5xl mx-auto">
          <p>
            We&apos;ve partnered with trusted local service providers to bring you reliable home maintenance and improvement solutions. Our average service provider has over 8 years of experience.
          </p>
          <button className="mt-12 px-8 py-3 text-sm border border-black text-black rounded-xl hover:bg-black hover:text-white transition-colors">
            Meet our Pros
          </button>
        </div>
      </div>
    </section>
  );
}
