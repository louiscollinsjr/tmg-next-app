'use server'

import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db/mongodb'
import Project from '@/lib/models/Project'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Types } from 'mongoose'

export type ProjectSubmission = {
  title: string
  description: string
  projectType: string
  timeline: string
}

export async function submitProject(data: ProjectSubmission) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    
    // If no session, return early with auth required flag
    if (!session?.user?.email) {
      return { 
        success: false, 
        requiresAuth: true,
      }
    }

    // Ensure we have the user's MongoDB _id
    if (!session.user.id) {
      return {
        success: false,
        error: 'User ID not found in session'
      }
    }

    const project = await Project.create({
      title: data.title,
      description: data.description,
      owner: new Types.ObjectId(session.user.id),
      status: 'planning', // Using valid enum value
      tags: [data.projectType],
      metadata: {
        timeline: data.timeline,
      },
      interactions: {
        views: 0,
        saves: 0,
        viewHistory: [],
        savedBy: []
      }
    })

    return {
      success: true,
      projectId: project._id.toString()
    }
  } catch (error) {
    console.error('Error submitting project:', error)
    return {
      success: false,
      error: 'Failed to submit project. Please try again.'
    }
  }
}

// Function to associate pending project with newly created/logged in user
export async function associatePendingProject(data: ProjectSubmission) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !session.user.id) {
      return { 
        success: false,
        error: 'No authenticated user found'
      }
    }

    const project = await Project.create({
      title: data.title,
      description: data.description,
      owner: new Types.ObjectId(session.user.id),
      status: 'planning', // Using valid enum value
      tags: [data.projectType],
      metadata: {
        timeline: data.timeline,
      },
      interactions: {
        views: 0,
        saves: 0,
        viewHistory: [],
        savedBy: []
      }
    })

    return {
      success: true,
      projectId: project._id.toString()
    }
  } catch (error) {
    console.error('Error associating pending project:', error)
    return {
      success: false,
      error: 'Failed to associate project. Please try again.'
    }
  }
}
