'use server'

import dbConnect from '@/lib/db/mongodb'
import Message from '@/lib/models/Message'
import Project from '@/lib/models/Project'
import { Types } from 'mongoose'

interface ProjectUser {
  _id: Types.ObjectId
  name: string
  email: string
  image?: string
}

interface ProjectDocument {
  _id: Types.ObjectId
  owner: ProjectUser
  contractor?: ProjectUser
}

interface PopulatedMessage {
  _id: Types.ObjectId;
  sender: ProjectUser;
  recipient: ProjectUser;
  projectId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getProjectMessages(projectId: string) {
  try {
    await dbConnect()
    
    // First get the project to ensure it exists and get owner/contractor info
    const project = await Project.findById(projectId)
      .populate<{ owner: ProjectUser }>('owner', 'name email image')
      .populate<{ contractor: ProjectUser }>('contractor', 'name email image')
      .lean<ProjectDocument>()

    if (!project) {
      throw new Error('Project not found')
    }

    if (!project.owner) {
      throw new Error('Project owner not found')
    }

    const messages = await Message.find({ projectId: new Types.ObjectId(projectId) })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email image')
      .populate('recipient', 'name email image')
      .lean<PopulatedMessage[]>()

    // Ensure all required fields exist before returning
    const safeProject = {
      _id: project._id.toString(),
      owner: {
        _id: project.owner._id.toString(),
        name: project.owner.name || 'Unknown',
        email: project.owner.email,
        image: project.owner.image || '/default-avatar.png'
      },
      contractor: project.contractor ? {
        _id: project.contractor._id.toString(),
        name: project.contractor.name || 'Unknown',
        email: project.contractor.email,
        image: project.contractor.image || '/default-avatar.png'
      } : null
    }

    const safeMessages = messages.map(message => {
      if (!message.sender || !message.recipient) {
        console.warn('Message found with missing sender or recipient:', message._id)
        return null
      }

      return {
        ...message,
        _id: message._id.toString(),
        sender: {
          _id: message.sender._id.toString(),
          name: message.sender.name || 'Unknown',
          email: message.sender.email,
          image: message.sender.image || '/default-avatar.png'
        },
        recipient: {
          _id: message.recipient._id.toString(),
          name: message.recipient.name || 'Unknown',
          email: message.recipient.email,
          image: message.recipient.image || '/default-avatar.png'
        },
        projectId: message.projectId.toString(),
        createdAt: message.createdAt.toISOString(),
        updatedAt: message.updatedAt.toISOString()
      }
    }).filter(Boolean) // Remove any null messages

    return {
      messages: safeMessages,
      project: safeProject
    }
  } catch (error) {
    console.error('Error in getProjectMessages:', error)
    throw error
  }
}
