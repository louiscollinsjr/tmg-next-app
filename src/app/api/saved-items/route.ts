import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/db/mongodb';
import UserSavedItem from '@/lib/models/UserSavedItem';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { itemId, itemType } = body;

    const savedItem = await UserSavedItem.create({
      userId: session.user.id,
      itemId,
      itemType,
    });

    return NextResponse.json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error);
    return NextResponse.json(
      { error: 'Failed to save item' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    await UserSavedItem.findOneAndDelete({
      userId: session.user.id,
      itemId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing saved item:', error);
    return NextResponse.json(
      { error: 'Failed to remove saved item' },
      { status: 500 }
    );
  }
}
