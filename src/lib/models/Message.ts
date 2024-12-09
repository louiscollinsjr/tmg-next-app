import mongoose from 'mongoose'

export interface IMessage {
  project: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  content: string;
  read?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Delete the existing model if it exists (to clear cache)
if (mongoose.models.Message) {
  delete mongoose.models.Message
}

const messageSchema = new mongoose.Schema({
  // Support both old and new field names for backward compatibility
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required']
  },
  content: {
    type: String,
    required: [true, 'Message content is required']
  },
  metadata: {
    readAt: {
      type: Date,
      default: new Date(0)
    }
  }
}, {
  timestamps: true
})

// Pre-save middleware to sync projectId and project fields
messageSchema.pre('save', function(next) {
  if (this.projectId && !this.project) {
    this.project = this.projectId
  } else if (this.project && !this.projectId) {
    this.projectId = this.project
  }
  next()
})

// Indexes for performance
messageSchema.index({ project: 1, createdAt: -1 })
messageSchema.index({ projectId: 1, createdAt: -1 })
messageSchema.index({ sender: 1, recipient: 1 })

export default mongoose.model('Message', messageSchema)
