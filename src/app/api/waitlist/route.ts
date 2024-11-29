import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Waitlist from '@/lib/models/Waitlist';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, postCode, isTradesman, trade } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if entry already exists
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({
      name,
      email,
      phone,
      postCode,
      isTradesman,
      trade,
      status: 'pending'
    });

    return NextResponse.json({
      message: 'Successfully joined waitlist',
      entry: {
        id: waitlistEntry._id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
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
