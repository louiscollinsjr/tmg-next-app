import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSavedItem extends Document {
  userId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  itemType: 'Project' | 'User';
  createdAt: Date;
}

const UserSavedItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: Schema.Types.ObjectId, refPath: 'itemType', required: true },
  itemType: {
    type: String,
    enum: ['Project', 'User'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Indexes
UserSavedItemSchema.index({ userId: 1, itemType: 1 });
UserSavedItemSchema.index({ itemId: 1, itemType: 1 });
UserSavedItemSchema.index({ userId: 1, itemId: 1 }, { unique: true }); // Prevent duplicate saves

export default mongoose.models.UserSavedItem || mongoose.model<IUserSavedItem>('UserSavedItem', UserSavedItemSchema);
