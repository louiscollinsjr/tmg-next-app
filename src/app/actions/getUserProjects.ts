'use server'

import dbConnect from '@/lib/db/mongodb'
import Project from '@/lib/models/Project'
import User from '@/lib/models/User'

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
    
    // First, find the user by email to get their MongoDB _id
    const user = await User.findOne({ email })
    if (!user) {
      console.error('User not found for email:', email)
      return []
    }

    const userId = user._id
    const projects = await Project.find({ owner: userId })
      .sort({ createdAt: -1 }) // Most recent first
      .lean() as Array<{
        _id: { toString(): string }
        title: string
        description: string
        budget: number
        location: string
        status: string
        createdAt: Date
        updatedAt: Date
        skills: string[]
        imageUrl?: string
      }>

    return projects.map(project => ({
      _id: project._id.toString(),
      title: project.title,
      description: project.description,
      budget: project.budget,
      location: project.location,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      skills: project.skills || [],
      imageUrl: project.imageUrl
    }))
  } catch (error) {
    console.error('Error in getUserProjects:', error)
    throw error
  }
}
