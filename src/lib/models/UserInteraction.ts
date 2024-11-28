import mongoose, { Schema, Document } from 'mongoose';

interface IUserInteraction extends Document {
  userId: mongoose.Types.ObjectId;
  professionalId: mongoose.Types.ObjectId;
  type: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

const userInteractionSchema = new Schema<IUserInteraction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {},
  },
});

// Indexes
userInteractionSchema.index({ userId: 1, type: 1, timestamp: -1 });
userInteractionSchema.index({ professionalId: 1, type: 1 });
userInteractionSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL

export default mongoose.models.UserInteraction || mongoose.model<IUserInteraction>('UserInteraction', userInteractionSchema);
