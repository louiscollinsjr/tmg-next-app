import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
  icon?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  parentCategory: { type: Schema.Types.ObjectId, ref: 'ServiceCategory' },
  icon: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Create indexes
ServiceCategorySchema.index({ slug: 1 });
ServiceCategorySchema.index({ parentCategory: 1 });

export default mongoose.models.ServiceCategory || mongoose.model<IServiceCategory>('ServiceCategory', ServiceCategorySchema);
