'use client';

import ProfessionalCard from './ProfessionalCard';

// Sample data - replace with actual data from your database
const sampleProfessionals = [
  {
    id: '1',
    name: 'John Smith',
    businessName: 'Smith Home Renovations',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2574', // Kitchen
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=2574', // Bathroom
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=2574', // Renovation
      'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?auto=format&fit=crop&q=80&w=2574', // Detail work
    ],
    rating: 4.9,
    reviewCount: 127,
    specialty: 'Kitchen & Bath Specialist',
    location: 'San Francisco Bay Area',
    isVerified: true,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    businessName: 'Modern Interior Design Co.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2574', // Living room
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2574', // Office space
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80&w=2574', // Bedroom
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=2574', // Dining room
    ],
    rating: 4.8,
    reviewCount: 127,
    specialty: 'Interior Design',
    location: 'East Bay Area',
    isVerified: false,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Mike Williams',
    businessName: 'Williams Construction',
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2574', // Construction site
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2574', // Building
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2574', // Architecture
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=2574', // Interior work
    ],
    rating: 4.7,
    reviewCount: 127,
    specialty: 'General Contractor',
    location: 'South Bay Area',
    isVerified: false,
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Emily Brown',
    businessName: 'Elegant Spaces',
    images: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2574', // Staged living room
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2574', // Staged bedroom
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=2574', // Staged dining
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2574', // Staged kitchen
    ],
    rating: 5.0,
    reviewCount: 127,
    specialty: 'Home Staging',
    location: 'Peninsula',
    isVerified: false,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'David Chen',
    businessName: 'Chen Architecture',
    images: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2574', // Modern house
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2574', // Interior design
      'https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&q=80&w=2574', // Office building
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=2574', // House exterior
    ],
    rating: 4.9,
    reviewCount: 127,
    specialty: 'Architectural Design',
    location: 'San Francisco',
    isVerified: true,
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    businessName: 'Green Gardens',
    images: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3', // Profile
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=2574', // Garden design
      'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=2574', // Landscaping
      'https://images.unsplash.com/photo-1605059509584-e2544f1a4263?auto=format&fit=crop&q=80&w=2574', // Garden path
      'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=2574', // Garden features
    ],
    rating: 4.8,
    reviewCount: 127,
    specialty: 'Landscape Design',
    location: 'North Bay Area',
    isVerified: true,
    isFavorite: false,
  },
];

// Photo Credits:
// Professional Headshots:
// 1. Photo by Linkedin Sales Solutions on Unsplash
// 2. Photo by Christina @ wocintechchat.com on Unsplash
// 3. Photo by Austin Distel on Unsplash
// 4. Photo by Christina @ wocintechchat.com on Unsplash
// 5. Photo by Ben Sweet on Unsplash
// 6. Photo by Christina @ wocintechchat.com on Unsplash
//
// Work Photos:
// Various photographers on Unsplash - full attribution available on request

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
