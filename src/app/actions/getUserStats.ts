'use server'

import dbConnect from '@/lib/db/mongodb'
import Project from '@/lib/models/Project'
import Review from '@/lib/models/Review'
import User from '@/lib/models/User'
import { ObjectId } from 'mongodb'

export interface UserStats {
  projectCount: number
  reviewCount: number
  averageRating: number
  isPro: boolean
}

export async function getUserStats(email: string): Promise<UserStats> {
  try {
    console.log('Getting stats for user email:', email);
    await dbConnect()
    
    // First, find the user by email to get their MongoDB _id
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return { projectCount: 0, reviewCount: 0, averageRating: 0, isPro: false };
    }

    const userId = user._id;
    console.log('Found user ID:', userId.toString());

    const [projectCount, reviews] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Review.find({ owner: userId })
    ])

    console.log('Found projects:', projectCount);
    console.log('Found reviews:', reviews.length);

    const reviewCount = reviews.length
    const averageRating = reviewCount > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
      : 0

    const stats = {
      projectCount,
      reviewCount,
      averageRating: Number(averageRating.toFixed(2)),
      isPro: user.isPro || false
    };
    
    console.log('Returning stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error in getUserStats:', error);
    throw error;
  }
}
