import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Waitlist from '@/lib/models/Waitlist';

export async function GET() {
  try {
    await dbConnect();
    
    const professionals = await Waitlist.find({ 
      isTradesman: true,
      status: 'pending'
    }).select({
      name: 1,
      email: 1,
      trade: 1,
      postCode: 1,
      createdAt: 1
    }).sort({ createdAt: -1 })
    .limit(20);

    return NextResponse.json(professionals);
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch professionals' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, postCode, trade } = body;

    if (!name || !email || !trade) {
      return NextResponse.json(
        { error: 'Name, email and trade are required' },
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

    // Create new professional waitlist entry
    const waitlistEntry = await Waitlist.create({
      name,
      email,
      phone,
      postCode,
      trade,
      isTradesman: true,
      status: 'pending'
    });

    return NextResponse.json({
      message: 'Successfully joined professional waitlist',
      entry: {
        id: waitlistEntry._id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        trade: waitlistEntry.trade
      },
    });
  } catch (error) {
    console.error('Error adding to professional waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join professional waitlist' },
      { status: 500 }
    );
  }
}
