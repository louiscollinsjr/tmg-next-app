'use server'

import dbConnect from '@/lib/db/mongodb'
import Message from '@/lib/models/Message'
import { Types } from 'mongoose'

interface MessageUser {
  _id: Types.ObjectId;
  name: string;
  image?: string;
}

interface PopulatedMessage {
  _id: Types.ObjectId;
  sender: MessageUser;
  recipient: MessageUser;
  project: Types.ObjectId;
  parentMessage?: Types.ObjectId;
  content: string;
  metadata: {
    read: boolean;
    readAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export async function markMessageAsRead(messageId: string) {
  try {
    await dbConnect()
    
    const message = await Message.findByIdAndUpdate(
      new Types.ObjectId(messageId),
      {
        $set: {
          'metadata.read': true,
          'metadata.readAt': new Date()
        }
      },
      { new: true }
    )
    .populate('sender', 'name image')
    .populate('recipient', 'name image')
    .lean<PopulatedMessage>()

    if (!message) {
      throw new Error('Message not found')
    }

    if (!message.sender || !message.recipient) {
      throw new Error('Message has invalid sender or recipient')
    }

    return {
      ...message,
      _id: message._id.toString(),
      sender: {
        _id: message.sender._id.toString(),
        name: message.sender.name,
        image: message.sender.image
      },
      recipient: {
        _id: message.recipient._id.toString(),
        name: message.recipient.name,
        image: message.recipient.image
      },
      project: message.project.toString(),
      parentMessage: message.parentMessage?.toString(),
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString()
    }
  } catch (error) {
    console.error('Error in markMessageAsRead:', error)
    throw error
  }
}
