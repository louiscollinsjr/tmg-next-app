import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, postCode, isTradesman } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new waitlist entry
    const user = await User.create({
      name,
      email,
      phone,
      postCode,
      role: isTradesman ? 'PROFESSIONAL' : 'USER',
      status: 'WAITLIST',
    });

    return NextResponse.json({
      message: 'Successfully joined waitlist',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
