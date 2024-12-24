import { dbConnect } from '@/lib/db'
import User from '@/lib/models/User'
import Review from '@/lib/models/Review'
import ProfessionalProfileClient from '@/components/ProfessionalProfileClient'
import { DisplayProfessional, Review as ReviewType, SelectedService, LeanUser } from '@/types/professional'
import { Types } from 'mongoose'
import { Document } from 'mongoose'

interface Props {
  professional: DisplayProfessional;
}

interface PageProps {
  params: {
    id: string
  }
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  projectType: string;
  createdAt: string;
}

interface Service {
  categoryId: string;
  optionId: string;
  _id?: any; // MongoDB adds this field
}

interface MongoReviewResponse {
  author: Types.ObjectId;
  content: string;
  createdAt: Date;
}

interface MongoReview extends Document {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  owner: Types.ObjectId;
  contractor: Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  status?: 'published' | 'pending' | 'reported' | 'removed';
  helpful?: {
    count: number;
    users: Types.ObjectId[];
  };
  responses?: MongoReviewResponse[];
  createdAt: Date;
  updatedAt?: Date;
  __v: number;
}

export default async function ProfessionalProfilePage({ params }: PageProps) {
  console.log('Fetching professional with ID:', params.id)
  
  await dbConnect()

  try {
    const rawProfessional = (await User.findById(params.id).lean()) as unknown
    
    if (!rawProfessional || typeof rawProfessional !== 'object') {
      throw new Error('Professional not found')
    }

    const professional = {
      ...rawProfessional as Record<string, any>,
      name: (rawProfessional as any).name || 'Unknown Professional',
      status: (rawProfessional as any).status || 'active'
    } as LeanUser

    const rawReviews = await Review.find({ contractor: params.id })
      .sort({ createdAt: -1 })
      .lean()

    const reviews = rawReviews as MongoReview[];

    const formattedReviews: ReviewType[] = reviews.map(review => {
      const defaultHelpful = { count: 0, users: [] };
      const helpful = review.helpful ? {
        count: review.helpful.count,
        users: review.helpful.users.map(userId => userId.toString())
      } : defaultHelpful;
      
      return {
        _id: review._id.toString(),
        project: review.project.toString(),
        owner: review.owner.toString(),
        contractor: review.contractor.toString(),
        rating: review.rating,
        title: review.title,
        content: review.content,
        images: review.images || [],
        status: review.status || 'published',
        helpful,
        responses: (review.responses || []).map((response: MongoReviewResponse) => ({
          author: response.author.toString(),
          content: response.content,
          createdAt: response.createdAt
        })),
        createdAt: review.createdAt,
        updatedAt: review.updatedAt || review.createdAt
      };
    });

    const reviewsForDisplay: Review[] = formattedReviews.map(review => ({
      id: review._id,
      rating: review.rating,
      comment: review.content,
      authorName: review.owner,
      projectType: 'Project',
      createdAt: review.createdAt.toISOString()
    }));

    const averageRating = reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0

    const displayProfessional: DisplayProfessional = {
      id: professional._id.toString(),
      name: professional.name,
      businessName: professional.businessInfo?.companyName || professional.name,
      images: [], // TODO: Add project images
      rating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length,
      specialty: professional.businessInfo?.specialties?.[0] || '',
      location: professional.businessInfo?.serviceArea?.[0] || '',
      isFavorite: professional.isFavorite || false,
      selectedServices: professional.selectedServices?.map(service => ({
        categoryId: service.categoryId,
        optionId: service.optionId,
        _id: service._id ? { $oid: service._id.toString() } : undefined
      })) || [],
      contactInfo: {
        email: professional.businessInfo?.email || '',
        phone: professional.businessInfo?.phone || ''
      },
      createdAt: professional.createdAt?.toISOString() || new Date().toISOString(),
      email: professional.businessInfo?.email || ''
    }

    return (
      <main>
        <ProfessionalProfileClient 
          professional={displayProfessional} 
          reviews={reviewsForDisplay}
        />
      </main>
    )

  } catch (error) {
    console.error('Error fetching professional:', error)
    return (
      <main>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900">Professional not found</h1>
          <p className="mt-2 text-gray-600">The professional you&apos;re looking for could not be found.</p>
        </div>
      </main>
    )
  }
}