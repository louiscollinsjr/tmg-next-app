'use client'

import React, { useState } from 'react';
import RatingStars from '@/components/RatingStars'
import { formatDate } from '@/utils/date'


interface DisplayProfessional {
  id: string;
  name: string;
  businessInfo: {
    companyName: string;
  };
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
  selectedServices: {
    categoryId: string;
    optionId: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    authorName: string;
    projectType: string;
    createdAt: string;
  }[];
}

interface Props {
  professional: DisplayProfessional;
}

export default function ProfessionalProfileClient({ professional }: Props) {
  const [selectedTab, setSelectedTab] = useState('about');

  // Add a null check for the professional object
  if (!professional || !professional.name) {
    return <div>Loading...</div>
  }

  return (
    <>
      
      <div className="min-h-screen bg-zinc-50 pt-64">
        {/* Header */}
        <div>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ maxWidth: '980px' }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-medium">
                  {professional.name.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <h1 className="text-4xl font-medium text-gray-900 font-roboto">
                    {professional.businessInfo?.companyName || professional.name}
                  </h1>
                  {professional.businessInfo?.companyName && (
                    <p className="text-lg text-gray-600 mt-1">{professional.name}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <h2 className="text-lg text-gray-600 font-roboto">{professional.specialty}</h2>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{professional.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <RatingStars rating={professional.rating} size='sm' />
                    <span className="text-gray-600">{professional.rating}</span>
                  </div>
                </div>
              </div>
              <button
                className="bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                onClick={() => document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request Estimate
              </button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="relative">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '980px' }}>
            {/* Main Image */}
            <div className="col-span-2 row-span-2 relative h-[480px] bg-gray-100 rounded-lg" />
            
            {/* Smaller Images */}
            <div className="relative h-[236px] bg-gray-100 rounded-lg" />
            <div className="relative h-[236px] bg-gray-100 rounded-lg" />
            <div className="relative h-[236px] bg-gray-100 rounded-lg" />
            <div className="relative h-[236px] bg-gray-100 rounded-lg group cursor-pointer">
              <div className="absolute inset-0 flex items-end justify-end p-4">
                <button className="text-gray-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                  View all photos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '980px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-24">
            
            {/* Left Column - Professional Details */}
            <div className="lg:col-span-3 space-y-8">
              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-gray-600">{professional.businessInfo?.companyName || professional.name}</p>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                <div className='border-y border-gray-200 py-10'>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 font-roboto">Certifications</h3>
                  <ul className="list-none list-inside text-gray-600 space-y-6">
                    <li>Master Electrician License</li>
                    <li>Certified Energy Auditor</li>
                    <li>OSHA Safety Certified</li>
                  </ul>
                </div>
                <div className='border-b border-gray-200 pb-10'>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 font-roboto ">Experience</h3>
                  <p className="text-gray-600">15 years in business</p>
                </div>
                <div className='border-0 border-gray-200 pb-10'>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 font-roboto">Service Area</h3>
                  <p className="text-gray-600">50 mile radius of San Francisco</p>
                </div>
                <div className='border-0 border-gray-200 pb-10'>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 font-roboto">Selected Services</h3>
                  <ul className="list-none list-inside text-gray-600 space-y-6">
                    {professional.selectedServices.map((service, index) => (
                      <li key={service.optionId || index}>
                        {service.optionId.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div id="request-form" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 font-roboto">Request an Estimate</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">
                        Project Description
                      </label>
                      <textarea
                        rows={4}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Send Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-zinc-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200" style={{ maxWidth: '980px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {professional.reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                        {review.authorName[0]}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{review.authorName}</h4>
                        <div className="text-sm text-gray-500">{review.projectType}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2 pt-2">
                    <RatingStars rating={review.rating} size='sm'/>
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="text-gray-600 font-normal mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
