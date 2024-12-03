'use server'

import dbConnect from '@/lib/db/mongodb'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'
import { Types } from 'mongoose'

interface LeanProject {
  _id: Types.ObjectId
  title: string
  description: string
  metadata?: {
    budget?: number
    location?: string
  }
  status: string
  tags: string[]
  images: Array<{ url: string }>
  createdAt: Date
  updatedAt: Date
}

export interface ProjectData {
  _id: string
  title: string
  description: string
  budget: number
  location: string
  status: string
  createdAt: Date
  updatedAt: Date
  skills: string[]
  imageUrl?: string
}

export async function getUserProjects(email: string): Promise<ProjectData[]> {
  try {
    await dbConnect()
    
    const user = await User.findOne({ email })
    if (!user) {
      console.error('User not found for email:', email)
      return []
    }

    const userId = user._id
    const rawProjects = await Project.find({ owner: userId })
      .sort({ createdAt: -1 })
      .lean()

    const projects = rawProjects as unknown as LeanProject[]

    return projects.map(project => ({
      _id: project._id.toString(),
      title: project.title || '',
      description: project.description || '',
      budget: project.metadata?.budget || 0,
      location: project.metadata?.location || '',
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      skills: project.tags || [],
      imageUrl: project.images?.[0]?.url
    }))
  } catch (error) {
    console.error('Error in getUserProjects:', error)
    throw error
  }
}
