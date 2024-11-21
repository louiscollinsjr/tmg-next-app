'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

// Default image if no profile image is available
const DEFAULT_IMAGE = 'https://randomuser.me/api/portraits/men/1.jpg';

export default function ProfessionalCard({
  id,
  name,
  businessName,
  images = [],
  rating,
  reviewCount,
  specialty,
  location,
  isVerified,
  isFavorite,
}: ProfessionalCardProps) {
  const [isSaved, setIsSaved] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Use default image if no images are provided or if there's an error
  const displayImages = imageError || !images.length ? [DEFAULT_IMAGE] : images;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (displayImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
      setImageError(false);
    }
  };

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (displayImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
      setImageError(false);
    }
  };

  return (
    <Link href={`/professionals/${id}`} className="block group relative">
      {/* Image Container */}
      <div className="relative w-[312px] h-[298px] overflow-hidden rounded-xl bg-gray-200">
        <Image
          src={displayImages[currentImageIndex]}
          alt={`${businessName || name}'s profile or work`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="312px"
          onError={() => setImageError(true)}
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && !imageError && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <IoIosArrowBack className="w-5 h-5 text-gray-800" />
              </button>
            )}
            {currentImageIndex < displayImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <IoIosArrowForward className="w-5 h-5 text-gray-800" />
              </button>
            )}
          </>
        )}

        {/* Image Indicators */}
        {displayImages.length > 1 && !imageError && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {displayImages.map((_, index) => (
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
        
        {/* Community Pick Badge */}
        {isFavorite && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
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
            <p className="text-xs text-gray-500">{specialty}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="w-3 h-3 text-gray-800" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
