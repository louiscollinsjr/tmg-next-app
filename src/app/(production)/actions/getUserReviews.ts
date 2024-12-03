'use server'

import dbConnect from '@/lib/db/mongodb'
import User from '@/lib/models/User'
import Review from '@/lib/models/Review'
import { Types } from 'mongoose'

interface LeanReview {
  _id: Types.ObjectId
  project: Types.ObjectId
  owner: Types.ObjectId
  contractor: Types.ObjectId
  rating: number
  title: string
  content: string
  status: string
  helpful: {
    count: number
    users: Types.ObjectId[]
  }
  metadata: {
    projectStage: string
    completionDate: Date
    verifiedPurchase: boolean
    categories: string[]
  }
  moderation: {
    reportCount: number
    reportedBy: Types.ObjectId[]
    reportReasons: string[]
  }
  images: Array<{ url: string; caption?: string }>
  responses: Array<{
    author: Types.ObjectId
    content: string
    timestamp: Date
    isContractor: boolean
  }>
  createdAt: Date
  updatedAt: Date
}

export interface ReviewData {
  _id: string
  project: string
  owner: string
  contractor: string
  rating: number
  title: string
  content: string
  status: string
  helpful: {
    count: number
    users: string[]
  }
  metadata: {
    projectStage: string
    completionDate: string
    verifiedPurchase: boolean
    categories: string[]
  }
  moderation: {
    reportCount: number
    reportedBy: string[]
    reportReasons: string[]
  }
  images: string[]
  responses: any[]
  createdAt: string
  updatedAt: string
}

export async function getUserReviews(email: string): Promise<ReviewData[]> {
  try {
    await dbConnect()
    
    const user = await User.findOne({ email })
    if (!user) {
      console.error('User not found for email:', email)
      return []
    }

    const userId = user._id
    const rawReviews = await Review.find({
      $or: [
        { owner: userId },
        { contractor: userId }
      ]
    })
      .sort({ createdAt: -1 })
      .lean()

    const reviews = rawReviews as unknown as LeanReview[]

    return reviews.map(review => ({
      _id: review._id.toString(),
      project: review.project.toString(),
      owner: review.owner.toString(),
      contractor: review.contractor.toString(),
      rating: review.rating || 0,
      title: review.title || '',
      content: review.content || '',
      status: review.status || 'pending',
      helpful: {
        count: review.helpful?.count || 0,
        users: (review.helpful?.users || []).map(id => id.toString())
      },
      metadata: {
        projectStage: review.metadata?.projectStage || '',
        completionDate: review.metadata?.completionDate?.toISOString() || new Date().toISOString(),
        verifiedPurchase: review.metadata?.verifiedPurchase || false,
        categories: review.metadata?.categories || []
      },
      moderation: {
        reportCount: review.moderation?.reportCount || 0,
        reportedBy: (review.moderation?.reportedBy || []).map(id => id.toString()),
        reportReasons: review.moderation?.reportReasons || []
      },
      images: (review.images || []).map(img => img.url),
      responses: (review.responses || []).map(response => ({
        ...response,
        author: response.author.toString()
      })),
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return []
  }
}
