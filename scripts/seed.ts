import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dbConnect from '../src/lib/db/mongodb';
import User from '../src/lib/models/User';
import Project from '../src/lib/models/Project';
import Review from '../src/lib/models/Review';

// Existing user IDs
const NORMAL_USER_ID = '673c825c066c51155a3d0852';
const PRO_USER_ID = '673c8c38066c51155a3d0857';

// Define home services with realistic descriptions and tags
const homeServices = [
  {
    title: "Kitchen Remodeling",
    description: "Complete kitchen transformation including cabinets, countertops, appliances, and layout optimization. Modern designs with functional workspace planning.",
    tags: ["kitchen", "remodeling", "renovation", "cabinets", "countertops", "appliances", "interior"]
  },
  {
    title: "Bathroom Renovation",
    description: "Full bathroom upgrades with modern fixtures, tiling, vanities, and water-efficient solutions. Focus on both aesthetics and functionality.",
    tags: ["bathroom", "renovation", "plumbing", "tiling", "fixtures", "interior"]
  },
  {
    title: "Landscaping & Garden Design",
    description: "Professional landscape design and maintenance, including irrigation systems, hardscaping, plant selection, and outdoor living spaces.",
    tags: ["landscaping", "garden", "outdoor", "irrigation", "plants", "hardscape"]
  },
  {
    title: "Electrical System Upgrade",
    description: "Comprehensive electrical services including panel upgrades, smart home integration, lighting design, and safety improvements.",
    tags: ["electrical", "wiring", "lighting", "smart-home", "safety"]
  },
  {
    title: "HVAC Installation & Repair",
    description: "Expert heating, ventilation, and air conditioning services. Installation, maintenance, and repairs for optimal climate control.",
    tags: ["hvac", "heating", "cooling", "ventilation", "maintenance"]
  },
  {
    title: "Roofing & Gutters",
    description: "Complete roofing solutions including repairs, replacement, and gutter systems. Quality materials and expert installation.",
    tags: ["roofing", "gutters", "exterior", "waterproofing", "maintenance"]
  },
  {
    title: "Interior Painting",
    description: "Professional interior painting services with premium materials. Color consultation and perfect finish guaranteed.",
    tags: ["painting", "interior", "decoration", "walls", "finishing"]
  },
  {
    title: "Deck & Patio Construction",
    description: "Custom deck and patio design and construction. Create perfect outdoor living spaces with quality materials.",
    tags: ["deck", "patio", "outdoor", "construction", "wood"]
  },
  {
    title: "Window Installation",
    description: "Energy-efficient window installation and replacement. Improve home comfort and reduce energy costs.",
    tags: ["windows", "energy-efficiency", "exterior", "installation"]
  },
  {
    title: "Plumbing Services",
    description: "Comprehensive plumbing solutions including repairs, installations, and maintenance. 24/7 emergency services available.",
    tags: ["plumbing", "repairs", "water", "maintenance", "emergency"]
  },
  {
    title: "Basement Finishing",
    description: "Transform your basement into functional living space. Includes waterproofing, insulation, and custom design.",
    tags: ["basement", "renovation", "waterproofing", "interior", "construction"]
  },
  {
    title: "Home Security Installation",
    description: "Modern security system installation including cameras, smart locks, and monitoring services.",
    tags: ["security", "smart-home", "cameras", "monitoring", "technology"]
  }
];

// Helper function to get random items from an array
const getRandomItems = <T>(arr: T[], count: number): T[] => {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Generate a project
const createProject = (ownerId: string, contractorId: string | null, status: 'in_progress' | 'planning' | 'on_hold' | 'completed' | 'cancelled') => {
  const service = faker.helpers.arrayElement(homeServices);
  const tags = service.tags;
  
  // Generate budget ranges as numbers
  const budgetRanges = [
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 25000 },
    { min: 25000, max: 50000 },
    { min: 50000, max: 100000 }
  ];
  const budgetRange = faker.helpers.arrayElement(budgetRanges);
  const budget = faker.number.int({ min: budgetRange.min, max: budgetRange.max });
  
  return {
    title: service.title,
    description: service.description,
    owner: new mongoose.Types.ObjectId(ownerId),
    contractor: contractorId ? new mongoose.Types.ObjectId(contractorId) : null,
    status,
    tags,
    images: Array(faker.number.int({ min: 1, max: 4 })).fill(null).map(() => ({
      url: faker.image.url(),
      caption: faker.lorem.sentence()
    })),
    metadata: {
      budget,
      timeline: faker.helpers.arrayElement(['1-2 weeks', '2-4 weeks', '1-2 months', '2-3 months', '3+ months']),
      location: `${faker.location.city()}, ${faker.location.state()}`
    }
  };
};

// Generate a review
const createReview = (projectId: string, ownerId: string, contractorId: string, rating: number) => {
  return {
    project: new mongoose.Types.ObjectId(projectId),
    owner: new mongoose.Types.ObjectId(ownerId),
    contractor: new mongoose.Types.ObjectId(contractorId),
    rating,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    images: Array(faker.number.int({ min: 0, max: 2 })).fill(null).map(() => ({
      url: faker.image.url(),
      caption: faker.lorem.sentence()
    })),
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
    // Clear existing data except the specified user
    console.log('Clearing existing data...');
    await User.deleteMany({ _id: { $ne: '673cd9cf808ed7018a54b9fc' } });
    await Project.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Existing data cleared');

    // Ensure the existing user exists with all fields
    const existingUserData = {
      _id: '673cd9cf808ed7018a54b9fc',
      email: 'louiscollinsjr@gmail.com',
      name: 'Louis Collins',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocIrtG11JsQW86cRwL-izk07HFYTQG36lcssCE2KDKI9rZvY6Ic=s96-c',
      providers: ['google', 'github'],
      providerId: '115393007835647650931',
      isPro: false,
      createdAt: new Date('2024-01-20T06:39:27.861Z'),
      updatedAt: new Date('2024-01-20T06:50:26.953Z'),
      __v: 1
    };

    let existingUser = await User.findById('673cd9cf808ed7018a54b9fc');
    if (!existingUser) {
      existingUser = await User.create(existingUserData);
      console.log('Created existing user');
    } else {
      await User.findByIdAndUpdate('673cd9cf808ed7018a54b9fc', existingUserData, { new: true });
      console.log('Updated existing user');
    }

    // Create professional users with business information
    console.log('Creating professional users...');
    const professionalUsers = await User.create(
      Array(8).fill(null).map(() => {
        const specialties = faker.helpers.arrayElements(homeServices, { min: 2, max: 4 });
        return {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          isPro: true,
          businessInfo: {
            companyName: faker.company.name(),
            yearsInBusiness: faker.number.int({ min: 1, max: 30 }),
            license: faker.string.alphanumeric(8).toUpperCase(),
            specialties: specialties.map(service => service.title),
            serviceArea: `${faker.location.city()}, ${faker.location.state()}`,
            website: faker.internet.url(),
            phone: faker.phone.number()
          }
        };
      })
    );

    // Create normal users (excluding the existing user)
    console.log('Creating normal users...');
    const normalUsers = await User.create(
      Array(11).fill(null).map(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        isPro: false,
      }))
    );

    const allNormalUsers = [...normalUsers, existingUser];

    // Create projects with proper relationships
    console.log('Creating projects...');
    const projects = [];

    // Ensure each user has at least one completed project
    for (const user of allNormalUsers) {
      if (!user) continue;
      
      // First project is always completed
      const contractor = faker.helpers.arrayElement(professionalUsers);
      projects.push(createProject(
        user._id.toString(),
        contractor._id.toString(),
        'completed'
      ));

      // Second project with random status
      if (Math.random() < 0.7) { // 70% chance of having a second project
        const status = faker.helpers.arrayElement([
          'in_progress',
          'planning',
          'on_hold',
          'cancelled'
        ]);

        let secondContractor = null;
        if (status !== 'planning') {
          const service = faker.helpers.arrayElement(homeServices);
          const eligibleContractors = professionalUsers.filter(pro => 
            pro.businessInfo.specialties.includes(service.title)
          );
          if (eligibleContractors.length > 0) {
            secondContractor = faker.helpers.arrayElement(eligibleContractors);
          } else {
            secondContractor = faker.helpers.arrayElement(professionalUsers);
          }
        }

        projects.push(createProject(
          user._id.toString(),
          secondContractor ? secondContractor._id.toString() : null,
          status
        ));
      }
    }

    const savedProjects = await Project.create(projects);
    console.log(`Created ${savedProjects.length} projects`);

    // Create reviews for completed projects
    console.log('Creating reviews...');
    const reviews = [];
    const completedProjects = savedProjects.filter(p => p.status === 'completed' && p.contractor);
    console.log(`Found ${completedProjects.length} completed projects for reviews`);

    for (const project of completedProjects) {
      // Create 1-3 reviews per completed project
      const numReviews = faker.number.int({ min: 1, max: 3 });
      
      for (let i = 0; i < numReviews; i++) {
        reviews.push(createReview(
          project._id.toString(),
          project.owner.toString(),
          project.contractor.toString(),
          faker.number.int({ min: 3, max: 5 })
        ));
      }
    }

    const savedReviews = await Review.create(reviews);
    console.log(`Created ${savedReviews.length} reviews`);

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeding
seed().catch(console.error);
