'use client';

import { 
  PaintBrush,
  Wrench,
  Tree,
  Pipe,
  Lightning,
  Broom,
  Bug,
  Storefront,
  Icon,
  Fan,
  Toolbox,
  Couch,
  Warehouse
} from "@phosphor-icons/react";

interface ServiceCategoryGridProps {
  onCategorySelect?: (slug: string | null) => void;
}

const categories = [
  { slug: 'electrical', name: 'Electrical', icon: Lightning },
  { slug: 'plumbing', name: 'Plumbing', icon: Pipe },
  { slug: 'hvac', name: 'HVAC', icon: Fan },
  { slug: 'construction-remodeling', name: 'Construction & Remodeling', icon: Toolbox },
  { slug: 'interior-design-decor', name: 'Interior Design', icon: Couch },
  { slug: 'cleaning-maintenance', name: 'Cleaning', icon: Broom },
  { slug: 'landscaping-outdoor', name: 'Landscaping', icon: Tree },
  { slug: 'handyman-services', name: 'Handyman', icon: Wrench },
  { slug: 'painting-wall-treatments', name: 'Painting', icon: PaintBrush },
  { slug: 'pest-control', name: 'Pest Control', icon: Bug },
  { slug: 'other', name: 'Other Services', icon: Storefront },
];

export default function ServiceCategoryGrid({ onCategorySelect }: ServiceCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.slug}
            onClick={() => onCategorySelect?.(category.slug)}
            className="flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <IconComponent className="w-8 h-8 text-[#013553] mb-3" weight="duotone" />
            <span className="text-sm text-gray-700 text-center">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
