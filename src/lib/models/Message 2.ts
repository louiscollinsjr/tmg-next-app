import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  projectId: Types.ObjectId;
  sender: {
    _id: Types.ObjectId;
    name: string;
    avatar?: string;
    role: 'owner' | 'contractor' | 'admin';
  };
  content: string;
  attachments?: Array<{
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
    size?: number;
  }>;
  metadata: {
    isRead: boolean;
    readAt?: Date;
    isEdited: boolean;
    editedAt?: Date;
    isDeleted: boolean;
    deletedAt?: Date;
  };
  status: 'sent' | 'delivered' | 'read';
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sender: {
      _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      avatar: String,
      role: { type: String, enum: ['owner', 'contractor', 'admin'], required: true },
    },
    content: { type: String, required: true },
    attachments: [{
      type: { type: String, enum: ['image', 'file', 'link'], required: true },
      url: { type: String, required: true },
      name: { type: String, required: true },
      size: Number,
    }],
    metadata: {
      isRead: { type: Boolean, default: false },
      readAt: Date,
      isEdited: { type: Boolean, default: false },
      editedAt: Date,
      isDeleted: { type: Boolean, default: false },
      deletedAt: Date,
    },
    status: { 
      type: String, 
      enum: ['sent', 'delivered', 'read'], 
      default: 'sent' 
    },
  },
  { 
    timestamps: true 
  }
);

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
