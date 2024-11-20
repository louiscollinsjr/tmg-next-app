'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface ProfessionalCardProps {
  id: string;
  name: string;
  businessName: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite?: boolean;
  isVerified?: boolean;
}

export default function ProfessionalCard({
  id,
  name,
  businessName,
  image,
  rating,
  reviewCount,
  specialty,
  location,
  isFavorite = false,
  isVerified = false,
}: ProfessionalCardProps) {
  const [isSaved, setIsSaved] = useState(isFavorite);

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="relative w-[312px] h-[298px] overflow-hidden rounded-xl bg-gray-200">
        <Image
          src={image}
          alt={`${name}'s profile`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="312px"
        />
        
        {/* Verified Badge */}
        {isVerified && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            {/* <RiVerifiedBadgeFill className="text-blue-500 w-4 h-4" /> */}
            <span className="text-xs font-medium">Community pick</span>
          </div>
        )}
        
        {/* Save Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
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
