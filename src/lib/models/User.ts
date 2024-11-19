import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  providers?: string[];
  providerId?: string;
  isPro: boolean;
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
  createdAt: Date;
  updatedAt: Date;
}

const businessInfoSchema = new Schema({
  companyName: String,
  yearsInBusiness: Number,
  license: String,
  insurance: String,
  specialties: [String],
  serviceArea: [String],
  website: String,
  phone: String
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
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
  businessInfo: businessInfoSchema
}, {
  timestamps: true,
  strict: false // Allows for flexible schema expansion
});

// Add indexes for better query performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ providerId: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
