import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  images: {
    url: string;
    caption?: string;
  }[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  tags: [String],
  images: [{
    url: { type: String, required: true },
    caption: String
  }],
  metadata: Schema.Types.Mixed
}, {
  timestamps: true
});

// Add indexes for better query performance
ProjectSchema.index({ owner: 1, status: 1 });
ProjectSchema.index({ tags: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
