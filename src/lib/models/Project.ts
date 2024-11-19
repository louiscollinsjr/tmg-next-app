import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  contractor: mongoose.Types.ObjectId;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  tags: string[];
  images: {
    url: string;
    caption?: string;
  }[];
  metadata?: {
    budget?: number;
    timeline?: string;
    location?: string;
  };
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
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
ProjectSchema.index({ owner: 1, status: 1 });
ProjectSchema.index({ tags: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
