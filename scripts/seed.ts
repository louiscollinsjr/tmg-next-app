import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dbConnect from '../src/lib/db/mongodb';
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
const createProject = (ownerId: string, status: 'draft' | 'published' | 'archived') => {
  const tags = getRandomItems(PROJECT_TAGS, faker.number.int({ min: 1, max: 3 }));
  
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    owner: new mongoose.Types.ObjectId(ownerId),
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
const createReview = (projectId: string, authorId: string) => {
  return {
    project: projectId,
    author: new mongoose.Types.ObjectId(authorId),
    rating: faker.number.int({ min: 3, max: 5 }), // Slightly biased towards positive reviews
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
    await Project.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create projects for normal user (as a customer)
    const customerProjects = await Project.create([
      {
        title: 'Kitchen Renovation',
        description: 'Complete kitchen remodel including new cabinets, countertops, and appliances',
        status: 'in_progress',
        tags: ['kitchen', 'renovation', 'appliances'],
        metadata: {
          budget: 25000,
          timeline: '3 months',
          location: 'Kitchen'
        },
        owner: new mongoose.Types.ObjectId(NORMAL_USER_ID)
      },
      {
        title: 'Bathroom Plumbing Fix',
        description: 'Fix leaking pipes and replace old fixtures in master bathroom',
        status: 'completed',
        tags: ['bathroom', 'plumbing', 'repair'],
        metadata: {
          budget: 2000,
          timeline: '1 week',
          location: 'Master Bathroom'
        },
        owner: new mongoose.Types.ObjectId(NORMAL_USER_ID)
      },
      {
        title: 'Deck Extension',
        description: 'Add 200 sq ft to existing deck with new railing and stairs',
        status: 'planning',
        tags: ['outdoor', 'deck', 'construction'],
        metadata: {
          budget: 8000,
          timeline: '2 weeks',
          location: 'Backyard'
        },
        owner: new mongoose.Types.ObjectId(NORMAL_USER_ID)
      },
      {
        title: 'Roof Repair',
        description: 'Fix leak and replace damaged shingles',
        status: 'on_hold',
        tags: ['roof', 'repair', 'exterior'],
        metadata: {
          budget: 3500,
          timeline: '3-4 days',
          location: 'Roof'
        },
        owner: new mongoose.Types.ObjectId(NORMAL_USER_ID)
      }
    ]);
    
    console.log(`✅ Created ${customerProjects.length} projects for normal user`);

    // Create some reviews for the completed project
    const completedProject = customerProjects.find(p => p.status === 'completed');
    if (completedProject) {
      await Review.create({
        project: completedProject._id,
        author: new mongoose.Types.ObjectId(NORMAL_USER_ID),
        rating: 5,
        title: 'Excellent work on the bathroom',
        content: 'The plumbing work was done quickly and professionally. No more leaks and the new fixtures look great!',
        isVerified: true,
        helpful: {
          count: 3,
          users: []
        }
      });
      console.log('✅ Created review for completed project');
    }

    // Create projects for pro user
    const proProjects = await Project.create([
      {
        title: 'Master Bedroom Addition',
        description: 'Adding a 400 sq ft master bedroom suite with walk-in closet and ensuite bathroom',
        status: 'in_progress',
        tags: ['construction', 'bedroom', 'bathroom'],
        metadata: {
          budget: 75000,
          timeline: '2 months',
          location: 'Second Floor'
        },
        owner: new mongoose.Types.ObjectId(PRO_USER_ID)
      },
      {
        title: 'Garage Door Replacement',
        description: 'Replace old garage door with modern automatic door and smart controls',
        status: 'completed',
        tags: ['garage', 'exterior', 'smart-home'],
        metadata: {
          budget: 2500,
          timeline: '1 day',
          location: 'Garage'
        },
        owner: new mongoose.Types.ObjectId(PRO_USER_ID)
      }
    ]);

    console.log(`✅ Created ${proProjects.length} projects for pro user`);
    
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
