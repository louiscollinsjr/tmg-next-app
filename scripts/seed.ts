import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dbConnect from '../src/lib/db/mongodb';
import User from '../src/lib/models/User';
import Project from '../src/lib/models/Project';
import Review from '../src/lib/models/Review';

// Existing user IDs
const NORMAL_USER_ID = '673c825c066c51155a3d0852';
const PRO_USER_ID = '673c8c38066c51155a3d0857';

// Project tags for home repair
const PROJECT_TAGS = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Roofing',
  'HVAC',
  'Landscaping',
  'Flooring',
  'Kitchen Remodel',
  'Bathroom Remodel'
];

// Helper function to get random items from an array
const getRandomItems = <T>(arr: T[], count: number): T[] => {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Generate a project
const createProject = (ownerId: string, contractorId: string | null, status: 'draft' | 'published' | 'archived') => {
  const tags = getRandomItems(PROJECT_TAGS, faker.number.int({ min: 1, max: 3 }));
  
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    owner: new mongoose.Types.ObjectId(ownerId),
    contractor: contractorId ? new mongoose.Types.ObjectId(contractorId) : null,
    status,
    tags,
    images: Array(faker.number.int({ min: 1, max: 4 })).fill(null).map(() => ({
      url: faker.image.url(),
      caption: faker.lorem.sentence()
    })),
    metadata: {
      budget: faker.number.int({ min: 1000, max: 50000 }),
      timeline: faker.number.int({ min: 1, max: 12 }) + ' weeks',
      location: faker.location.city() + ', ' + faker.location.state()
    }
  };
};

// Generate a review
const createReview = (projectId: string, ownerId: string, contractorId: string, rating: number) => {
  return {
    project: projectId,
    owner: new mongoose.Types.ObjectId(ownerId),
    contractor: new mongoose.Types.ObjectId(contractorId),
    rating,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    images: Array(faker.number.int({ min: 0, max: 2 })).fill(null).map(() => ({
      url: faker.image.url(),
      caption: faker.lorem.sentence()
    })),
    isVerified: faker.datatype.boolean(),
    helpful: {
      count: faker.number.int({ min: 0, max: 50 }),
      users: []
    }
  };
};

async function seed() {
  console.log('🌱 Starting seeding...');
  
  await dbConnect();
  
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create professional users with business information
    const professionalUsers = await User.create([
      {
        email: 'pro1@example.com',
        name: 'John Smith',
        isPro: true,
        businessInfo: {
          companyName: 'Smith Construction LLC',
          yearsInBusiness: 15,
          license: 'LIC-123456',
          insurance: 'INS-789012',
          specialties: ['Kitchen Remodel', 'Bathroom Remodel', 'Home Addition'],
          serviceArea: ['San Francisco', 'Oakland', 'San Jose'],
          website: 'www.smithconstruction.com',
          phone: '(555) 123-4567'
        }
      },
      {
        email: 'pro2@example.com',
        name: 'Sarah Johnson',
        isPro: true,
        businessInfo: {
          companyName: 'Modern Interiors',
          yearsInBusiness: 8,
          license: 'LIC-654321',
          insurance: 'INS-098765',
          specialties: ['Interior Design', 'Home Staging', 'Color Consultation'],
          serviceArea: ['San Francisco', 'Marin', 'East Bay'],
          website: 'www.moderninteriors.com',
          phone: '(555) 987-6543'
        }
      }
    ]);

    // Create normal users
    const normalUsers = await User.create([
      {
        email: 'user1@example.com',
        name: 'Alice Brown',
        isPro: false
      },
      {
        email: 'user2@example.com',
        name: 'Bob Wilson',
        isPro: false
      }
    ]);

    // Create projects with proper relationships
    const projects = [];
    
    // In Progress Projects (with both owner and contractor)
    for (const user of normalUsers) {
      projects.push(createProject(user._id.toString(), professionalUsers[0]._id.toString(), 'in_progress'));
    }

    // Planning Projects (only owner, no contractor)
    for (const user of normalUsers) {
      projects.push(createProject(user._id.toString(), null, 'planning'));
    }

    // Completed Projects (with both owner and contractor)
    for (const user of normalUsers) {
      projects.push(createProject(user._id.toString(), professionalUsers[1]._id.toString(), 'completed'));
    }

    const savedProjects = await Project.create(projects);

    // Create reviews for completed projects
    const reviews = [];
    const completedProjects = savedProjects.filter(p => p.status === 'completed');

    for (const project of completedProjects) {
      reviews.push(createReview(project._id.toString(), project.owner.toString(), project.contractor.toString(), faker.number.int({ min: 3, max: 5 })));
    }

    await Review.create(reviews);

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Database connection closed');
  }
}

// Run the seeding
seed().catch(console.error);
