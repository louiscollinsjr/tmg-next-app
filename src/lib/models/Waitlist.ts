import mongoose, { Schema, Document } from 'mongoose';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  phone?: string;
  postCode?: string;
  isTradesman: boolean;
  trade?: string;
  createdAt: Date;
  status: 'pending' | 'contacted' | 'converted';
}

const WaitlistSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  postCode: { type: String },
  isTradesman: { type: Boolean, default: false },
  trade: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'contacted', 'converted'], default: 'pending' }
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
