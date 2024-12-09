'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth.config"
import dbConnect from "@/lib/db/mongodb"
import Message from "@/lib/models/Message"
import User from "@/lib/models/User"
import { Types } from "mongoose"

interface SendMessageParams {
  projectId: string
  content: string
  recipientEmail: string
}

interface MessageUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image?: string;
}

interface PopulatedMessage {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  projectId: Types.ObjectId;
  content: string;
  sender: MessageUser;
  recipient: MessageUser;
  metadata: {
    readAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface SafeMessage {
  _id: string;
  project: string;
  projectId: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  recipient: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function sendProjectMessage({ projectId, content, recipientEmail }: SendMessageParams): Promise<SafeMessage> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error('Not authenticated')

    await dbConnect()

    // Find sender and recipient by email
    const [sender, recipient] = await Promise.all([
      User.findOne({ email: session.user.email }),
      User.findOne({ email: recipientEmail })
    ])

    if (!sender) throw new Error('Sender not found')
    if (!recipient) throw new Error('Recipient not found')

    const projectObjectId = new Types.ObjectId(projectId)

    // Create the message with both field names
    const message = await Message.create({
      project: projectObjectId,  // Old field name
      projectId: projectObjectId,  // New field name
      content,
      sender: sender._id,
      recipient: recipient._id,
      metadata: {
        readAt: new Date(0)
      }
    })

    // Populate and return the message
    const populatedMessage = await Message.findById(message._id)
      .populate<{ sender: MessageUser }>('sender', 'name email image')
      .populate<{ recipient: MessageUser }>('recipient', 'name email image')
      .lean<PopulatedMessage>()

    if (!populatedMessage) throw new Error('Failed to create message')
    if (!populatedMessage.sender || !populatedMessage.recipient) throw new Error('Failed to populate message')

    return {
      ...populatedMessage,
      _id: populatedMessage._id.toString(),
      sender: {
        _id: populatedMessage.sender._id.toString(),
        name: populatedMessage.sender.name || 'Unknown',
        email: populatedMessage.sender.email,
        image: populatedMessage.sender.image || '/default-avatar.png'
      },
      recipient: {
        _id: populatedMessage.recipient._id.toString(),
        name: populatedMessage.recipient.name || 'Unknown',
        email: populatedMessage.recipient.email,
        image: populatedMessage.recipient.image || '/default-avatar.png'
      },
      projectId: populatedMessage.projectId.toString(),
      project: populatedMessage.project.toString(),
      createdAt: populatedMessage.createdAt.toISOString(),
      updatedAt: populatedMessage.updatedAt.toISOString()
    }
  } catch (error) {
    console.error('Error in sendProjectMessage:', error)
    throw error
  }
}
