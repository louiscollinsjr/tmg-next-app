import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  project: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  contractor: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  status: 'published' | 'pending' | 'reported' | 'removed';
  helpful: {
    count: number;
    users: mongoose.Types.ObjectId[];
  };
  responses?: Array<{
    author: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
    isContractor: boolean;
  }>;
  metadata?: {
    projectStage?: string;
    completionDate?: Date;
    verifiedPurchase?: boolean;
    categories?: string[];
  };
  moderation?: {
    reportCount: number;
    reportedBy: mongoose.Types.ObjectId[];
    reportReasons?: string[];
    lastReviewedAt?: Date;
    reviewedBy?: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['published', 'pending', 'reported', 'removed'],
    default: 'published'
  },
  helpful: {
    count: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  images: [{
    url: { type: String, required: true },
    caption: String
  }],
  responses: [{
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    timestamp: { type: Date, default: Date.now },
    isContractor: Boolean
  }],
  metadata: {
    projectStage: String,
    completionDate: Date,
    verifiedPurchase: Boolean,
    categories: [String]
  },
  moderation: {
    reportCount: { type: Number, default: 0 },
    reportedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reportReasons: [String],
    lastReviewedAt: Date,
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }
}, {
  timestamps: true
});

// Production-optimized indexes
ReviewSchema.index({ project: 1, rating: -1 });
ReviewSchema.index({ owner: 1 });
ReviewSchema.index({ contractor: 1 });
ReviewSchema.index({ status: 1 });
ReviewSchema.index({ 'helpful.count': -1 });
ReviewSchema.index({ 'moderation.reportCount': 1 });
ReviewSchema.index({ createdAt: -1 });
ReviewSchema.index({ 'metadata.categories': 1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
