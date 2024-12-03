import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
} as const

interface RatingStarsProps {
  rating: number
  size?: keyof typeof sizes
}

export default function RatingStars({ rating, size = 'md' }: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`full-${i}`} className={`text-black-400 ${sizes[size]}`} />
      ))}
      {hasHalfStar && (
        <StarIcon key="half" className={`text-black-400 ${sizes[size]} opacity-50`} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutlineIcon key={`empty-${i}`} className={`text-black-400 ${sizes[size]}`} />
      ))}
    </div>
  )
}
