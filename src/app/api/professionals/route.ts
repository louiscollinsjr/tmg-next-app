import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    const professionals = await User.find({ 
      role: 'professional',
      'businessProfile.status': 'active'
    }).select({
      name: 1,
      'businessProfile.businessName': 1,
      'businessProfile.specialties': 1,
      'businessProfile.serviceAreas': 1,
      'businessProfile.workImages': 1,
      'businessProfile.rating': 1,
      'businessProfile.reviewCount': 1,
      'businessProfile.isVerified': 1
    }).limit(20);

    return NextResponse.json(professionals);
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch professionals' },
      { status: 500 }
    );
  }
}
