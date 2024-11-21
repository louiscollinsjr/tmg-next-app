import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  isPro: boolean;
  providers: Array<{
    name: string;
    providerId: string;
    lastLogin: Date;
  }>;
  contact?: {
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  businessInfo?: {
    companyName?: string;
    yearsInBusiness?: number;
    license?: string;
    insurance?: string;
    specialties?: string[];
    serviceArea?: string[];
    website?: string;
    phone?: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
    };
    visibility: 'public' | 'private' | 'connections';
  };
  lastActive: Date;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  isPro: { type: Boolean, default: false },
  
  providers: [{
    name: String,
    providerId: String,
    lastLogin: { type: Date, default: Date.now }
  }],
  
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

  businessInfo: {
    companyName: String,
    yearsInBusiness: Number,
    license: String,
    insurance: String,
    specialties: [String],
    serviceArea: [String],
    website: String,
    phone: String
  },

  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false }
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'connections'],
      default: 'public'
    }
  },

  lastActive: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true,
  strict: false
});

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ 'providers.providerId': 1 });
UserSchema.index({ isPro: 1, lastActive: -1 });
UserSchema.index({ 'businessInfo.specialties': 1 });
UserSchema.index({ 'businessInfo.serviceArea': 1 });
UserSchema.index({ status: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
