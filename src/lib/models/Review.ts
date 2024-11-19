import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  project: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  images?: {
    url: string;
    caption?: string;
  }[];
  isVerified: boolean;
  helpful: {
    count: number;
    users: mongoose.Types.ObjectId[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{
    url: { type: String, required: true },
    caption: String
  }],
  isVerified: { type: Boolean, default: false },
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
ReviewSchema.index({ project: 1, rating: -1 });
ReviewSchema.index({ author: 1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
