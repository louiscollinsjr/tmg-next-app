import { Types } from 'mongoose';

export interface SelectedService {
  categoryId: string;
  optionId: string;
  categoryName?: string;
  _id?: {
    $oid: string;
  };
}

export interface ContactInfo {
  phone?: string;
  email?: string;
}

export interface DisplayProfessional {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  image?: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
  selectedServices?: SelectedService[];
  contactInfo?: ContactInfo;
  createdAt: string;
  email?: string;
}

export interface ServiceCategory {
  slug: string;
  name: string;
}

export interface ProfessionalsData {
  professionals: DisplayProfessional[];
  categories: ServiceCategory[];
}

export interface LeanUser {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  businessInfo?: {
    companyName?: string;
    specialties?: string[];
    serviceArea?: string[];
    email?: string;
    phone?: string;
  };
  selectedServices?: Array<{
    categoryId: string;
    optionId: string;
    _id?: Types.ObjectId;
  }>;
  isFavorite?: boolean;
  createdAt?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface ProjectWithImages {
  contractor: Types.ObjectId;
  images: Array<{
    url: string;
    caption?: string;
  }>;
}

export interface Review {
  _id: string;
  project: string;
  owner: string;
  contractor: string;
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
    users: string[];
  };
  responses?: Array<{
    author: string;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
