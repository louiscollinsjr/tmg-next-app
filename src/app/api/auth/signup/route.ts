import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name || password.length < 8) {
      return NextResponse.json(
        { error: 'Invalid input - password should be at least 8 characters' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);

    interface NewUser {
      email: string;
      password: string;
      name?: string;
      role: string;
    }

    const newUser: NewUser = {
      email,
      password: hashedPassword,
      name,
      role: 'user'
    };

    const user = await User.create(newUser);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error: unknown) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
