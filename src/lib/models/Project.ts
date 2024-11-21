import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  contractor?: mongoose.Types.ObjectId;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  tags: string[];
  images: Array<{
    url: string;
    caption?: string;
  }>;
  metadata?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
  interactions?: {
    views: number;
    saves: number;
    lastViewed?: Date;
    viewHistory: Array<{
      user: mongoose.Types.ObjectId;
      timestamp: Date;
    }>;
    savedBy: mongoose.Types.ObjectId[];
  };
  milestones?: Array<{
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    dueDate?: Date;
    completedDate?: Date;
  }>;
  updates?: Array<{
    author: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
    attachments?: Array<{
      url: string;
      type: string;
      name: string;
    }>;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contractor: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  tags: [String],
  images: [{
    url: { type: String, required: true },
    caption: String
  }],
  metadata: {
    budget: Number,
    timeline: String,
    location: String
  },
  interactions: {
    views: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    lastViewed: Date,
    viewHistory: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now }
    }],
    savedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  milestones: [{
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    dueDate: Date,
    completedDate: Date
  }],
  updates: [{
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now },
    attachments: {
      type: [{
        url: { type: String, required: true },
        type: { type: String },
        name: { type: String }
      }],
      default: undefined
    }
  }]
}, {
  timestamps: true
});

// Indexes for production optimization
ProjectSchema.index({ owner: 1, status: 1 });
ProjectSchema.index({ contractor: 1, status: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ 'interactions.views': -1 });
ProjectSchema.index({ 'interactions.saves': -1 });
ProjectSchema.index({ 'interactions.savedBy': 1 });
ProjectSchema.index({ 'updates.timestamp': -1 });
ProjectSchema.index({ createdAt: -1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
