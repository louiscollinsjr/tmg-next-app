'use server'

import dbConnect from '@/lib/db/mongodb'
import User from '@/lib/models/User'
import Review from '@/lib/models/Review'

export interface ReviewData {
  _id: string;
  project: string;
  owner: string;
  contractor: string;
  rating: number;
  title: string;
  content: string;
  status: string;
  helpful: {
    count: number;
    users: string[];
  };
  metadata: {
    projectStage: string;
    completionDate: string;
    verifiedPurchase: boolean;
    categories: string[];
  };
  moderation: {
    reportCount: number;
    reportedBy: string[];
    reportReasons: string[];
  };
  images: string[];
  responses: any[];
  createdAt: string;
  updatedAt: string;
}

export async function getUserReviews(email: string): Promise<ReviewData[]> {
  try {
    await dbConnect()
    
    // First, find the user by email to get their MongoDB _id
    const user = await User.findOne({ email })
    if (!user) {
      console.error('User not found for email:', email)
      return []
    }

    const userId = user._id
    // Find reviews where the user is either the owner or the contractor
    const reviews = await Review.find({
      $or: [
        { owner: userId },
        { contractor: userId }
      ]
    })
      .sort({ createdAt: -1 }) // Most recent first
      .lean()

    return reviews.map(review => ({
      ...review,
      _id: review._id.toString(),
      owner: review.owner.toString(),
      contractor: review.contractor.toString(),
      project: review.project.toString(),
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return []
  }
}
