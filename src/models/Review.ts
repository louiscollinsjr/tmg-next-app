import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a professional ID'],
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
  },
  authorName: {
    type: String,
    required: [true, 'Please provide an author name'],
  },
  projectType: {
    type: String,
    required: [true, 'Please provide a project type'],
  }
}, {
  timestamps: true,
})

export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
