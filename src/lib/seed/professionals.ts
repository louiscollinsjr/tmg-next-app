import mongoose from 'mongoose';
import dbConnect from '../dbConnect';
import User from '../models/User';
import ServiceCategory from '../models/ServiceCategory';

async function seedProfessionals() {
  try {
    await dbConnect();
    console.log('Connected to database for seeding...');

    // First, let's create some service categories if they don't exist
    const categories = [
      { name: 'Plumbing', slug: 'plumbing' },
      { name: 'Electrical', slug: 'electrical' },
      { name: 'Carpentry', slug: 'carpentry' },
      { name: 'Painting', slug: 'painting' }
    ];

    const savedCategories = await Promise.all(
      categories.map(async (cat) => {
        const existing = await ServiceCategory.findOne({ slug: cat.slug });
        if (!existing) {
          return await ServiceCategory.create(cat);
        }
        return existing;
      })
    );

    console.log('Service categories created/found:', savedCategories.length);

    // Create some test professionals
    const professionals = [
      {
        email: 'john.doe@example.com',
        name: 'John Doe',
        image: '/images/professionals/john-doe.jpg',
        isPro: true,
        status: 'active',
        businessInfo: {
          companyName: 'John\'s Plumbing',
          serviceArea: ['San Francisco', 'Oakland'],
          specialties: ['Residential Plumbing', 'Commercial Plumbing']
        },
        selectedServices: [
          { categoryId: savedCategories[0]._id.toString(), optionId: 'option1' }
        ]
      },
      {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        image: '/images/professionals/jane-smith.jpg',
        isPro: true,
        status: 'active',
        businessInfo: {
          companyName: 'Smith Electric',
          serviceArea: ['San Francisco', 'San Jose'],
          specialties: ['Residential Electric', 'Solar Installation']
        },
        selectedServices: [
          { categoryId: savedCategories[1]._id.toString(), optionId: 'option1' }
        ]
      }
    ];

    // Insert professionals if they don't exist
    for (const pro of professionals) {
      const existing = await User.findOne({ email: pro.email });
      if (!existing) {
        await User.create(pro);
        console.log(`Created professional: ${pro.name}`);
      } else {
        console.log(`Professional already exists: ${pro.name}`);
      }
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

export default seedProfessionals;
