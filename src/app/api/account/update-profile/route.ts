import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to update your profile' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Here you would typically update the user's profile in your database
    // For now, we'll just return the updated data
    const updatedUser = {
      ...session.user,
      name: data.name,
    };
    return NextResponse.json({ success: true, user: updatedUser });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
