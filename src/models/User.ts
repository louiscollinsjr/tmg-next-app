import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  businessName: {
    type: String,
    required: [true, 'Please provide a business name'],
  },
  specialty: {
    type: String,
    required: [true, 'Please provide a specialty'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  images: {
    type: [String],
    default: [],
  },
  selectedServices: {
    type: [{
      categoryId: String,
      optionId: String
    }],
    default: [],
  }
}, {
  timestamps: true,
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
