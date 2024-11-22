import { dbConnect } from '@/lib/db'
import { User } from '@/models/User'
import { Review } from '@/models/Review'
import ProfessionalProfileClient from '@/components/ProfessionalProfileClient'

interface PageProps {
  params: {
    id: string
  }
}

interface Service {
  categoryId: string;
  optionId: string;
  _id?: any; // MongoDB adds this field
}

interface DisplayProfessional {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
  selectedServices: Service[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    authorName: string;
    projectType: string;
    createdAt: string;
  }[];
}

export default async function ProfessionalProfilePage({ params }: PageProps) {
  console.log('Fetching professional with ID:', params.id)
  
  await dbConnect()

  try {
    const professional = await User.findById(params.id)
    
    if (!professional) {
      throw new Error('Professional not found')
    }

    // Get reviews for this professional
    const reviews = await Review.find({ professionalId: params.id })
    const rating = reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0

    // Transform and serialize the data
    const serializedServices = professional.selectedServices?.map((service: Service) => ({
      categoryId: service.categoryId,
      optionId: service.optionId,
    })) || []

    // Serialize reviews
    const serializedReviews = reviews.map(review => ({
      id: review._id.toString(),
      rating: review.rating,
      comment: review.comment,
      authorName: review.authorName,
      projectType: review.projectType,
      createdAt: review.createdAt.toISOString(),
    }))

    // Transform the data to match the DisplayProfessional interface
    const displayProfessional: DisplayProfessional = {
      id: professional._id.toString(),
      name: professional.name || '',
      businessName: professional.businessName || '',
      images: professional.images || [],
      rating,
      reviewCount: reviews.length,
      specialty: professional.specialty || '',
      location: professional.location || '',
      isFavorite: false,
      selectedServices: serializedServices,
      reviews: serializedReviews
    }

    return <ProfessionalProfileClient professional={displayProfessional} />
  } catch (error) {
    console.error('Error fetching professional:', error)
    return <div>Error loading professional profile</div>
  }
}