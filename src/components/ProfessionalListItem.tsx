import { DisplayProfessional } from '@/types/professional';
import Link from 'next/link';
import Image from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface ProfessionalListItemProps extends DisplayProfessional {}

export default function ProfessionalListItem({
  id,
  name,
  businessName,
  selectedServices,
  contactInfo,
  specialty,
  rating,
  reviewCount,
  isFavorite,
  image,
  createdAt,
  email
}: ProfessionalListItemProps) {
  const serviceCategories = selectedServices?.map(service => service.categoryName).join(', ') || specialty || 'Various Services';
  const displayRating = rating ? rating.toFixed(1) : '0.0';
  const reviewText = `${reviewCount || 0} ${reviewCount === 1 ? 'Review' : 'Reviews'}`;
  const joinedYear = createdAt ? new Date(createdAt).getFullYear() : null;

  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(isFavorite);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      // Redirect to sign in or show sign in modal
      return;
    }

    try {
      if (isSaved) {
        await fetch(`/api/saved-items?itemId=${id}`, {
          method: 'DELETE',
        });
      } else {
        await fetch('/api/saved-items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: id,
            itemType: 'User',
          }),
        });
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  return (
    <Link href={`/professionals/${id}`} className="block relative">
      <div className="pr-3 py-3 hover:bg-gray-50 transition-colors h-full relative bg-gray-100 p-4 pb-16 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0 relative w-12 h-12">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={48}
                height={48}
                className="absolute inset-0 w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-white font-medium shadow-sm">
                {name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()}
              </div>
            )}
          </div>
          <div className="ml-3 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate font-roboto tracking-wide">
              {name || businessName}
            </h3>
            {joinedYear && (
              <p className="text-xs text-gray-500 mt-0 font-roboto">
                Joined {joinedYear}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <BsStarFill className="w-3 h-3 text-gray-900" />
          <span className="text-xs text-gray-900">{displayRating}</span>
          <span className="text-xs text-gray-500 ml-1">• {reviewText}</span>
          {isFavorite && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-gray-900 text-white rounded">
              <b>tmg.</b> Choice
            </span>
          )}
        </div>
        {businessName && (
          <p className="text-xs text-gray-600 truncate mt-2">Business: {businessName}</p>
        )}
        {/* <p className="text-xs text-gray-600 mt-1 truncate">
          {serviceCategories}
        </p> */}
        {/* {contactInfo && (
          <div className="text-xs text-gray-500 mt-1">
            {contactInfo.phone && (
              <p className="truncate">{contactInfo.phone}</p>
            )}
            {contactInfo.email && (
              <p className="truncate">{contactInfo.email}</p>
            )}
          </div>
        )} */}
        <button className="absolute bottom-3 left-3 bg-gray-200/80 text-gray-400 font-roboto font-normal px-6 py-1 rounded-lg hover:bg-gray-800 transition-colors text-xs">
          Get Estimate
        </button>

        <button
          onClick={handleSave}
          className="absolute bottom-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isSaved ? (
            <FaHeart className="w-3 h-3 text-red-500/40" />
          ) : (
            <FaRegHeart className="w-3 h-3 text-gray-400/40" />
          )}
        </button>
      </div>
    </Link>
  );
}
