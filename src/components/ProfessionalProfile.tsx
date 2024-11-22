'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RatingStars from '@/components/RatingStars';
import { formatDate } from '@/utils/date';
import { FaStar } from 'react-icons/fa';
import { DisplayProfessional } from '@/types/professional';

interface ProfessionalProfileProps {
  professional: DisplayProfessional;
}

export default function ProfessionalProfile({ professional }: ProfessionalProfileProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Mock data for additional details - replace with real data later
  const additionalData = {
    description: "With over 15 years of experience in residential and commercial electrical work, I specialize in comprehensive electrical solutions that prioritize safety and efficiency. Licensed and certified, I take pride in delivering high-quality workmanship and exceptional customer service.",
    certifications: ["Master Electrician License", "Certified Energy Auditor", "OSHA Safety Certified"],
    yearsExperience: 15,
    serviceArea: "50 mile radius of San Francisco",
    detailedRatings: {
      overall: professional.rating,
      timeliness: 4.8,
      cleanliness: 4.9,
      communication: 5.0,
      value: 4.7,
      quality: 4.9,
      expertise: 4.8
    },
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        workType: "Kitchen Remodeling",
        rating: 5,
        date: "2024-01-15",
        content: "John did an amazing job installing new electrical panels in our home. He was professional, punctual, and thoroughly explained everything he was doing. Highly recommend!"
      },
      {
        id: 2,
        author: "Michael Chen",
        workType: "Bathroom Renovation",
        rating: 5,
        date: "2024-01-10",
        content: "Very professional and knowledgeable. Completed the work ahead of schedule and kept the workspace clean."
      }
    ]
  };

  return (
    <>
      <Navigation />
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-gray-900">{professional.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <RatingStars rating={professional.rating} />
                <span className="text-sm text-gray-600">({professional.reviewCount} reviews)</span>
              </div>
              <span className="text-sm text-gray-600">{professional.location}</span>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {professional.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-w-4 aspect-h-3 relative overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${professional.name}&apos;s work ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Professional Info */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">About {professional.name}</h2>
              <p className="text-gray-600 mb-6">{additionalData.description}</p>
              
              <div className="space-y-6">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {additionalData.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-600">{cert}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Experience</h3>
                  <p className="text-gray-600">{additionalData.yearsExperience} years in business</p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Service Area</h3>
                  <p className="text-gray-600">{additionalData.serviceArea}</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <button className="w-full bg-black text-white py-3 rounded-lg mb-4">
                  Message
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg">
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">Reviews</h2>
            <div className="grid grid-cols-2 gap-8">
              {additionalData.reviews.map((review) => (
                <div key={review.id} className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{review.author}</h3>
                      <p className="text-sm text-gray-500">{review.workType}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-600">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{formatDate(review.date)}</p>
                  <p className="text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Full Screen Photo Gallery */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="absolute right-8 top-8 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-full overflow-auto py-8">
            <div className="max-w-5xl mx-auto px-4 space-y-4">
              {professional.images.map((image, index) => (
                <div key={index} className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${professional.name}&apos;s work ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
