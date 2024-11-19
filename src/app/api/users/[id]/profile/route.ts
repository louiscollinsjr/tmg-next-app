import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import Project from '@/lib/models/Project';
import Review from '@/lib/models/Review';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Fetching profile data for user:', params.id);
    await dbConnect();
    
    // Fetch user data - try both ObjectId and providerId
    let user;
    if (mongoose.Types.ObjectId.isValid(params.id)) {
      user = await User.findById(params.id).select('-password -__v');
    } else {
      user = await User.findOne({ providerId: params.id }).select('-password -__v');
    }

    if (!user) {
      console.log('User not found:', params.id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log('Found user:', user._id);

    // Fetch user's projects
    const projects = await Project.find({ owner: user._id })
      .select('-__v')
      .sort({ createdAt: -1 });
    console.log('Found projects:', projects.length);

    // Fetch reviews for user's projects
    const reviews = await Review.find({
      project: { $in: projects.map(p => p._id) }
    })
      .populate('author', 'name')
      .select('-__v')
      .sort({ createdAt: -1 });
    console.log('Found reviews:', reviews.length);

    return NextResponse.json({
      user,
      projects,
      reviews
    });
  } catch (error: any) {
    console.error('Profile fetch error:', error.message);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch profile data: ' + error.message },
      { status: 500 }
    );
  }
}
