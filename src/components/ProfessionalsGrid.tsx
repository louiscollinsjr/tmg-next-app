'use client';

import ProfessionalCard from './ProfessionalCard';

// Sample data - replace with actual data from your database
const sampleProfessionals = [
  {
    id: '1',
    name: 'John Smith',
    businessName: 'Smith Home Renovations',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3',
    rating: 4.9,
    reviewCount: 127,
    specialty: 'Kitchen & Bath Remodeling',
    location: 'San Francisco, CA',
    isVerified: true,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    businessName: 'Modern Interior Design Co.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2676&ixlib=rb-4.0.3',
    rating: 4.8,
    reviewCount: 89,
    specialty: 'Interior Design',
    location: 'San Francisco, CA',
    isVerified: true,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Mike Williams',
    businessName: 'Williams Construction',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    rating: 4.7,
    reviewCount: 156,
    specialty: 'General Contractor',
    location: 'Oakland, CA',
    isVerified: false,
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Emily Brown',
    businessName: 'Elegant Spaces',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=2661&ixlib=rb-4.0.3',
    rating: 5.0,
    reviewCount: 42,
    specialty: 'Home Staging',
    location: 'San Jose, CA',
    isVerified: true,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'David Chen',
    businessName: 'Chen Architecture',
    image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    rating: 4.9,
    reviewCount: 73,
    specialty: 'Architectural Design',
    location: 'San Francisco, CA',
    isVerified: true,
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    businessName: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=2657&ixlib=rb-4.0.3',
    rating: 4.8,
    reviewCount: 91,
    specialty: 'Landscape Design',
    location: 'Berkeley, CA',
    isVerified: true,
    isFavorite: false,
  },
];

export default function ProfessionalsGrid() {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-[22px]">
        {/* Grid Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Featured Professionals</h2>
            <p className="text-gray-500">Discover top-rated professionals in your area</p>
          </div>
          <button className="text-gray-600 hover:text-gray-900">
            View all
          </button>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {sampleProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
