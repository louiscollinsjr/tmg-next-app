'use client'

import { formatDistanceToNow } from 'date-fns'

interface ReviewData {
  id: string
  title: string
  content: string
  rating: number
  createdAt: string
  userImage?: string
  userName: string
}

interface ReviewCardProps {
  review: ReviewData
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="bg-[#f2f3EE] rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4 text-[#64635f]">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {review.userImage ? (
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {review.userName.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium">{review.userName}</h3>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
          </div>
          <h4 className="text-sm font-normal mb-2">{review.title}</h4>
          <p className="text-xs text-[#64635f] line-clamp-3 mb-3">{review.content}</p>
        </div>
      </div>

      <div className="flex justify-end items-center text-sm">
        <span className="text-xs text-[#64635f]">
          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}

export default ReviewCard
