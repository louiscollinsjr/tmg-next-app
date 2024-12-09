'use server'

import dbConnect from '@/lib/db/mongodb'
import Message, { IMessage } from '@/lib/models/Message'
import Project from '@/lib/models/Project'
import { Types } from 'mongoose'
import User, { IUser } from '@/lib/models/User'

export interface MessageData {
  _id: string
  content: string
  sender: {
    _id: string
    name: string
    avatar?: string
    role: 'owner' | 'contractor' | 'admin'
  }
  status: 'sent' | 'delivered' | 'read'
  metadata: {
    isRead: boolean
    readAt?: string
  }
  createdAt: string
}

interface ProjectDocument {
  _id: Types.ObjectId;
  title: string;
  owner: Types.ObjectId;
}

interface MessageDocument {
  _id: Types.ObjectId;
  project: Types.ObjectId;
  projectId?: Types.ObjectId;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  metadata: {
    readAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

type UserLeanDocument = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  image?: string;
  role?: 'owner' | 'contractor' | 'admin';
  __v: number;
  [key: string]: any;
}

export async function getProjectMessages(projectId: string): Promise<MessageData[]> {
  try {
    await dbConnect()
    console.log('Fetching messages for projectId:', projectId);
    
    // First verify the project exists
    const project = await Project.findById(projectId).lean() as ProjectDocument | null;
    if (!project) {
      console.error('Project not found:', projectId);
      return [];
    }
    
    // Convert string ID to ObjectId for query
    const objectId = new Types.ObjectId(projectId);
    console.log('Project found:', {
      _id: project._id.toString(),
      title: project.title,
      owner: project.owner.toString()
    });
    
    // Get all messages to debug
    const allMessages = await Message.find().lean() as MessageDocument[];
    console.log('All messages in database:', allMessages.map(m => ({
      _id: m._id.toString(),
      projectId: m.projectId?.toString(),
      content: m.content.substring(0, 50)
    })));
    
    // Get messages for this project
    const messages = await Message.find({ 
      projectId: objectId 
    })
    .sort({ createdAt: 1 }) // Sort by creation time ascending
    .lean() as MessageDocument[];

    console.log('Messages for project:', {
      count: messages.length,
      projectId: projectId,
      projectTitle: project.title,
      messages: messages.map(m => ({
        _id: m._id.toString(),
        projectId: m.projectId?.toString(),
        content: m.content.substring(0, 50),
        sender: {
          _id: m.sender.toString(),
          name: ''
        }
      }))
    });

    // Get all unique sender IDs
    const senderIds = [...new Set(messages.map(m => m.sender.toString()))];
    
    // Fetch all senders in one query
    const senders = await User.find({
      _id: { $in: senderIds }
    })
    .select('_id email name image role')
    .lean() as UserLeanDocument[];

    // Create a map of sender info for quick lookup
    const senderMap = new Map(
      senders.map(s => [s._id.toString(), {
        name: s.name || '',
        role: (s.role || 'contractor') as 'owner' | 'contractor' | 'admin'
      }])
    );

    const formattedMessages = messages.map(msg => ({
      _id: msg._id.toString(),
      content: msg.content,
      sender: {
        _id: msg.sender.toString(),
        name: senderMap.get(msg.sender.toString())?.name || '',
        avatar: '',
        role: senderMap.get(msg.sender.toString())?.role || 'contractor'
      },
      status: 'delivered' as const,
      metadata: {
        isRead: false,
        readAt: msg.metadata.readAt?.toISOString()
      },
      createdAt: msg.createdAt.toISOString()
    }));

    console.log('Formatted messages:', {
      count: formattedMessages.length,
      projectId,
      projectTitle: project.title,
      sample: formattedMessages.slice(0, 2).map(m => ({
        _id: m._id,
        content: m.content.substring(0, 50),
        sender: m.sender._id
      }))
    });

    return formattedMessages;
  } catch (error) {
    console.error('Error fetching project messages:', {
      error,
      projectId,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}
