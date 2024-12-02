'use client'

import { formatDistanceToNow, format } from 'date-fns'
import { ReviewData } from '@/app/actions/getUserReviews'
import { CheckCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import RatingStars from './RatingStars'

interface ReviewCardProps {
  review: ReviewData
  userName?: string
}

const ReviewCard = ({ review, userName = 'Anonymous User' }: ReviewCardProps) => {
  return (
    <div className="bg-[#f2f3EE] rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col text-[#64635f]">
        <div className="flex items-center gap-2 mb-2">
          <UserCircleIcon className="w-5 h-5" />
          <span className="text-xs font-bold">{userName}</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <RatingStars rating={review.rating} size="xs" />
            <span className="text-sm font-semibold">{review.title}</span>
          </div>
          {/* {review.metadata.verifiedPurchase && (
            <div className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              <CheckCircleIcon className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )} */}
        </div>
        <p className="text-xs text-[#64635f] line-clamp-3 mb-3">
          Reviewed on {format(new Date(review.createdAt), 'MMMM d, yyyy')}
        </p>
        <p className="text-xs text-[#64635f] line-clamp-3 mb-3">{review.content}</p>

        {review.images.length > 0 && (
          <div className="flex gap-2 mb-3">
            {review.images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ))}
            {review.images.length > 3 && (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                +{review.images.length - 3}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center text-xs mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              {review.helpful.count} people found this helpful
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
