'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface ProfessionalCardProps {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isVerified: boolean;
  isFavorite: boolean;
}

export default function ProfessionalCard({
  id,
  name,
  businessName,
  images,
  rating,
  reviewCount,
  specialty,
  location,
  isVerified,
  isFavorite,
}: ProfessionalCardProps) {
  const [isSaved, setIsSaved] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="relative w-[312px] h-[298px] overflow-hidden rounded-xl bg-gray-200">
        <Image
          src={images[currentImageIndex]}
          alt={`${name}'s profile or work`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="312px"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={(e) => { e.preventDefault(); previousImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <IoIosArrowBack className="w-5 h-5 text-gray-800" />
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.preventDefault(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <IoIosArrowForward className="w-5 h-5 text-gray-800" />
              </button>
            )}
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                } hover:bg-white/90`}
              />
            ))}
          </div>
        )}
        
        {/* Verified Badge */}
        {isVerified && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            {/* <RiVerifiedBadgeFill className="text-blue-500 w-4 h-4" /> */}
            <span className="text-xs font-medium">Community pick</span>
          </div>
        )}
        
        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform duration-150"
        >
          {isSaved ? (
            <FaHeart className="w-4 h-4 text-red-500" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-gray-700" />
          )}
        </button>
      </div>

      {/* Details */}
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{businessName}</h3>
            <p className="text-sm text-gray-500">{specialty}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="w-3 h-3 text-gray-800" />
            <span className="text-sm font-medium">{rating}</span>
            {/* <span className="text-sm text-gray-500">({reviewCount})</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}