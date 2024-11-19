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
    // Create projects for normal user (as a customer)
    const customerProjects = await Project.create([
      createProject(NORMAL_USER_ID, 'published'),
      createProject(NORMAL_USER_ID, 'published'),
      createProject(NORMAL_USER_ID, 'draft')
    ]);
    
    console.log(`✅ Created ${customerProjects.length} projects for normal user`);

    // Create projects that the pro user is working on
    const proProjects = await Project.create([
      createProject(PRO_USER_ID, 'published'),
      createProject(PRO_USER_ID, 'published'),
      createProject(PRO_USER_ID, 'archived')
    ]);
    
    console.log(`✅ Created ${proProjects.length} projects for pro user`);

    // Create reviews for completed projects
    const reviews = [];
    
    // Reviews from normal user for pro's work
    for (const project of proProjects) {
      if (project.status === 'published' || project.status === 'archived') {
        reviews.push(createReview(project._id, NORMAL_USER_ID));
      }
    }

    // Reviews from other users for pro's work
    for (const project of proProjects) {
      if (project.status === 'published' || project.status === 'archived') {
        const reviewCount = faker.number.int({ min: 1, max: 3 });
        for (let i = 0; i < reviewCount; i++) {
          reviews.push(createReview(project._id, NORMAL_USER_ID));
        }
      }
    }

    await Review.create(reviews);
    console.log(`✅ Created ${reviews.length} reviews`);

    console.log('✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeding
seed().catch(console.error);
