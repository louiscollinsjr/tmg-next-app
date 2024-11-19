import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  password?: string;
  providers: string[];
  providerId?: string;
  isPro: boolean;
  contact: {
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  business?: {
    name: string;
    description: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  password: { type: String, select: false },
  providers: [String],
  providerId: String,
  isPro: { type: Boolean, default: false },
  contact: {
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  },
  business: {
    name: String,
    description: String,
    website: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
    },
  },
}, {
  timestamps: true,
  strict: false // Allows for flexible schema expansion
});

// Add indexes for better query performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ providerId: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
