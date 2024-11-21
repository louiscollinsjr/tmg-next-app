'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RatingStars from '@/components/RatingStars'
import { formatDate } from '@/utils/date'
import { FaStar } from 'react-icons/fa'

export default function ProfessionalProfile({ params }: { params: { id: string } }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  // Mock data - replace with actual data fetching
  const professional = {
    id: params.id,
    name: "John Smith",
    title: "Master Electrician",
    location: "San Francisco Bay Area",
    rating: 4.9,
    reviewCount: 127,
    description: "With over 15 years of experience in residential and commercial electrical work, I specialize in comprehensive electrical solutions that prioritize safety and efficiency. Licensed and certified, I take pride in delivering high-quality workmanship and exceptional customer service.",
    certifications: ["Master Electrician License", "Certified Energy Auditor", "OSHA Safety Certified"],
    yearsExperience: 15,
    serviceArea: "50 mile radius of San Francisco",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621905252615-9d9a68f71f9c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621905252689-1a9d9247e76b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621905252762-09b7be9d9e8c?w=800&h=600&fit=crop"
    ],
    detailedRatings: {
      overall: 4.9,
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
        author: "Mike Chen",
        workType: "Electrical Installation",
        rating: 5,
        date: "2024-01-10",
        content: "Very impressed with John's work. He helped us upgrade our outdated wiring and install new lighting fixtures. His attention to detail and cleanliness were outstanding."
      },
      {
        id: 3,
        author: "Emily Rodriguez",
        workType: "Home Renovation",
        rating: 4,
        date: "2024-01-05",
        content: "Great experience working with John. He was able to diagnose and fix our electrical issues quickly and efficiently. Fair pricing and excellent communication throughout."
      }
    ]
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 pt-24">
        {/* Header */}
        <div>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ maxWidth: '980px' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-medium text-gray-900 font-roboto">{professional.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <h2 className="text-lg text-gray-600 font-roboto">{professional.title}</h2>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{professional.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <RatingStars rating={professional.rating} size='sm' />
                  <span className="text-gray-600">{professional.rating}</span>
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
            <div className="relative h-[236px] bg-gray-100 rounded-lg group cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <div className="absolute inset-0 flex items-end justify-end p-4">
                <button className="text-gray-700 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                  View all photos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '980px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Professional Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-gray-600">{professional.description}</p>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Certifications</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {professional.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Experience</h3>
                  <p className="text-gray-600">{professional.yearsExperience} years in business</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Service Area</h3>
                  <p className="text-gray-600">{professional.serviceArea}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-1">
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto"
                        placeholder="Describe your project..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-roboto">
                        Preferred Contact Method
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 font-roboto">
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white font-roboto px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Request Estimate
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Detailed Ratings */}
        <div className="bg-zinc-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-zinc-50" style={{ maxWidth: '980px' }}>
          <div className="grid grid-cols-7 gap-0 mb-1  rounded-lg">
            {Object.entries({
              'Overall rating': professional.detailedRatings.overall,
              'Timeliness': professional.detailedRatings.timeliness,
              'Cleanliness': professional.detailedRatings.cleanliness,
              'Communication': professional.detailedRatings.communication,
              'Value': professional.detailedRatings.value,
              'Quality': professional.detailedRatings.quality,
              'Expertise': professional.detailedRatings.expertise
            }).map(([category, rating], index) => (
              <div key={category} className={`px-4 py-2 ${index < 6 ? 'border-r border-gray-200' : ''}`}>
                <div className="text-sm tracking-wide font-medium text-black mb-1 text-left">{category}</div>
                <div className="flex items-center gap-1">
                  {/* <RatingStars rating={rating} size="sm" /> */}
                  <span className="text-sm text-gray-600">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
</div>
        {/* Reviews */}
        <div className="bg-zinc-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200" style={{ maxWidth: '980px' }}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-roboto">Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {professional.reviews.map((review) => (
                <div key={review.id} className="">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                        {review.author.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                        <div className="text-sm text-gray-500">{review.workType}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2 pt-2">
                    <RatingStars rating={review.rating} size='sm'/>
                    <span>{formatDate(review.date)}</span>
                  </div>
                  <p className="text-gray-600 font-normal">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      <Footer />

      {/* Full Screen Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative h-full">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-full overflow-auto py-8">
              <div className="max-w-5xl mx-auto px-4 space-y-4">
                {professional.images.map((image, index) => (
                  <div key={index} className="relative h-[600px] bg-gray-100 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
