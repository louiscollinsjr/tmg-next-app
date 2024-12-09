'use server'

import dbConnect from '@/lib/db/mongodb'
import Message from '@/lib/models/Message'
import { Types } from 'mongoose'
import { getCurrentUser } from '@/lib/auth'

export async function getUnreadMessageCount() {
  try {
    await dbConnect()
    
    const user = await getCurrentUser()
    if (!user?.email) {
      throw new Error('User not authenticated')
    }

    const count = await Message.countDocuments({
      recipient: new Types.ObjectId(user.id),
      'metadata.read': false
    })

    return count
  } catch (error) {
    console.error('Error in getUnreadMessageCount:', error)
    throw error
  }
}
