import mongoose, { Schema, Document } from 'mongoose';

export interface IUserInteraction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'project_view' | 'profile_view' | 'search' | 'save';
  targetId?: mongoose.Types.ObjectId;
  targetModel?: 'Project' | 'User';
  metadata?: any;
  createdAt: Date;
}

const UserInteractionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['project_view', 'profile_view', 'search', 'save'],
    required: true
  },
  targetId: { type: Schema.Types.ObjectId, refPath: 'targetModel' },
  targetModel: {
    type: String,
    enum: ['Project', 'User'],
    required: function(this: any): boolean {
      return this.targetId != null;
    }
  },
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, expires: '90d' } // TTL index
});

// Indexes
UserInteractionSchema.index({ userId: 1, type: 1, createdAt: -1 });
UserInteractionSchema.index({ targetId: 1, type: 1 });
UserInteractionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL

export default mongoose.models.UserInteraction || mongoose.model<IUserInteraction>('UserInteraction', UserInteractionSchema);
