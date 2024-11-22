export interface SelectedService {
  categoryId: string;
  optionId: string;
  _id?: {
    $oid: string;
  };
}

export interface DisplayProfessional {
  id: string;
  name: string;
  businessName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  isFavorite: boolean;
  selectedServices?: SelectedService[];
}
