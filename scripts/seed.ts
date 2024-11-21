import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../src/lib/models/User';
import Project from '../src/lib/models/Project';
import Review from '../src/lib/models/Review';
import UserInteraction from '../src/lib/models/UserInteraction';
import UserSavedItem from '../src/lib/models/UserSavedItem';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tmg-next-app';

// Helper function to generate random profile images
const getRandomProfileImage = () => {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const number = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
};

// Helper function to generate random work images
const getRandomWorkImages = (count: number) => {
  return Array(count).fill(null).map(() => ({
    url: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
    caption: getRandomProjectImageCaption()
  }));
};

// Helper function to generate project titles
const getRandomProjectTitle = () => {
  const projectTypes = [
    'Kitchen Remodel',
    'Bathroom Renovation',
    'Home Addition',
    'Basement Finishing',
    'Outdoor Living Space',
    'Home Office Conversion',
    'Master Suite Upgrade',
    'Garage Renovation',
    'Deck Construction',
    'Landscape Design'
  ];
  
  const descriptors = [
    'Modern', 'Contemporary', 'Traditional', 'Custom', 'Luxury',
    'Energy-Efficient', 'Smart', 'Eco-Friendly', 'High-End', 'Budget-Friendly'
  ];
  
  const locations = [
    'in San Francisco', 'in Palo Alto', 'in Mountain View',
    'in Sunnyvale', 'in San Jose', 'in Oakland'
  ];
  
  return `${faker.helpers.arrayElement(descriptors)} ${faker.helpers.arrayElement(projectTypes)} ${faker.helpers.arrayElement(locations)}`;
};

// Helper function to generate project descriptions
const getRandomProjectDescription = () => {
  const scope = [
    'Complete transformation of the existing space',
    'Partial renovation focusing on key areas',
    'Ground-up construction with premium materials',
    'Modern upgrade with smart home integration',
    'Eco-friendly renovation with sustainable materials'
  ];
  
  const features = [
    'custom cabinetry', 'premium countertops', 'energy-efficient appliances',
    'smart home automation', 'LED lighting', 'sustainable materials',
    'high-end finishes', 'built-in storage solutions', 'modern fixtures',
    'premium flooring'
  ];
  
  const benefits = [
    'increased home value', 'improved functionality',
    'enhanced energy efficiency', 'better space utilization',
    'modern aesthetic appeal', 'reduced maintenance needs'
  ];
  
  const selectedFeatures = faker.helpers.arrayElements(features, faker.number.int({ min: 3, max: 5 }));
  const selectedBenefits = faker.helpers.arrayElements(benefits, faker.number.int({ min: 2, max: 3 }));
  
  return `${faker.helpers.arrayElement(scope)}. This project features ${selectedFeatures.join(', ')}. ` +
    `The renovation provides ${selectedBenefits.join(' and ')}, creating a perfect balance of style and functionality. ` +
    `Project timeline and budget were carefully managed to meet the client's expectations.`;
};

// Helper function to generate project image captions
const getRandomProjectImageCaption = () => {
  const views = [
    'Front view', 'Side angle', 'Detail shot', 'Before',
    'After', 'Progress photo', 'Finishing touches', 'Installation process'
  ];
  
  const elements = [
    'custom cabinets', 'countertops', 'flooring', 'lighting',
    'appliances', 'fixtures', 'hardware', 'trim work',
    'paint finish', 'tilework'
  ];
  
  return `${faker.helpers.arrayElement(views)} of ${faker.helpers.arrayElement(elements)}`;
};

// Helper function to generate review titles
const getRandomReviewTitle = () => {
  const sentiments = [
    'Exceeded Our Expectations',
    'Fantastic Experience',
    'Professional and Efficient',
    'Outstanding Quality',
    'Highly Recommended',
    'Great Attention to Detail',
    'Excellent Communication',
    'Perfect Results',
    'Dream Project Realized',
    'Worth Every Penny'
  ];
  
  return faker.helpers.arrayElement(sentiments);
};

// Helper function to generate review content
const getRandomReviewContent = (rating: number) => {
  const positivePoints = [
    'The team was highly professional and punctual',
    'Communication was excellent throughout the project',
    'They stayed within budget and timeline',
    'The attention to detail was impressive',
    'Clean and organized work site',
    'Creative solutions to unexpected challenges',
    'High-quality materials and craftsmanship',
    'Respectful of our home and privacy',
    'Project management was seamless',
    'The results exceeded our expectations'
  ];
  
  const negativePoints = [
    'Minor delays in schedule',
    'Some communication gaps',
    'A few details needed adjustment',
    'Slight budget overrun',
    'Initial planning could have been better'
  ];
  
  const selectedPositive = faker.helpers.arrayElements(
    positivePoints,
    rating >= 4 ? faker.number.int({ min: 3, max: 5 }) : faker.number.int({ min: 1, max: 2 })
  );
  
  const selectedNegative = rating < 4 
    ? faker.helpers.arrayElements(negativePoints, faker.number.int({ min: 1, max: 2 }))
    : [];
  
  let review = selectedPositive.join('. ') + '. ';
  if (selectedNegative.length > 0) {
    review += selectedNegative.join('. ') + '. ';
  }
  
  if (rating >= 4) {
    review += 'Would definitely recommend their services!';
  } else if (rating === 3) {
    review += 'Overall satisfied with the results.';
  } else {
    review += 'Hope they can improve their service in the future.';
  }
  
  return review;
};

// Helper function to generate business specialties
const getRandomSpecialties = () => {
  const specialties = [
    'Kitchen Remodeling', 'Bathroom Remodeling', 'Home Extensions',
    'Outdoor Living Spaces', 'Interior Design', 'Custom Carpentry',
    'Flooring Installation', 'Painting', 'Electrical Work',
    'Plumbing', 'HVAC Services', 'Landscaping'
  ];
  return faker.helpers.arrayElements(specialties, faker.number.int({ min: 2, max: 5 }));
};

// Helper function to generate service areas
const getRandomServiceAreas = () => {
  const areas = [
    'San Francisco', 'Oakland', 'San Jose', 'Palo Alto',
    'Mountain View', 'Sunnyvale', 'Santa Clara', 'Fremont'
  ];
  return faker.helpers.arrayElements(areas, faker.number.int({ min: 2, max: 4 }));
};

// Helper function to generate update content
const getRandomUpdateContent = (updateType: string) => {
  switch (updateType) {
    case 'Progress Update':
      return `We're making great progress on your project! Our team has been working diligently to ensure everything is completed to the highest standards. We're currently ${faker.lorem.sentence()} and expect to be finished by ${faker.date.future().toLocaleDateString()}.`;
    case 'Milestone Reached':
      return `We're excited to announce that we've reached a major milestone in your project! Our team has successfully completed the ${faker.lorem.word()} phase, and we're now moving on to the next stage. We'll keep you updated on our progress and let you know if there are any changes to the schedule.`;
    case 'Schedule Update':
      return `We've made some adjustments to the project schedule to ensure everything runs smoothly. We're now expecting to complete the project by ${faker.date.future().toLocaleDateString()}. We'll keep you updated on any further changes and let you know if there's anything you need to do to prepare.`;
    case 'Material Selection':
      return `We've selected the materials for your project and are excited to share them with you! We've chosen ${faker.lorem.word()} for the ${faker.lorem.word()} and ${faker.lorem.word()} for the ${faker.lorem.word()}. We think these materials will really make your project stand out and provide the look and feel you're going for.`;
    case 'Design Review':
      return `We've completed the design review for your project and are excited to share the results with you! Our team has worked hard to ensure that every detail is perfect, and we're confident that you'll love the final product. We'll be in touch soon to discuss the next steps and answer any questions you may have.`;
    case 'Inspection Completed':
      return `We've completed the inspection for your project and are pleased to report that everything is in good condition. We've identified a few minor issues that need to be addressed, but we're confident that we can resolve them quickly and efficiently. We'll keep you updated on our progress and let you know if there's anything you need to do to prepare.`;
    case 'Phase Completion':
      return `We've completed the ${faker.lorem.word()} phase of your project and are moving on to the next stage. We're excited to see the project coming together and are confident that the final result will be amazing. We'll keep you updated on our progress and let you know if there are any changes to the schedule.`;
    default:
      return '';
  }
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Review.deleteMany({}),
      UserInteraction.deleteMany({}),
      UserSavedItem.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create regular users
    const regularUsers = await Promise.all(
      Array(10).fill(null).map(async () => {
        return User.create({
          email: faker.internet.email(),
          name: faker.person.fullName(),
          image: getRandomProfileImage(),
          isPro: false,
          providers: [{
            name: 'google',
            providerId: faker.string.uuid(),
            lastLogin: faker.date.recent()
          }],
          contact: {
            phone: faker.phone.number(),
            address: {
              street: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              zip: faker.location.zipCode(),
              country: 'USA'
            }
          },
          preferences: {
            notifications: {
              email: true,
              push: true,
              marketing: faker.datatype.boolean()
            },
            visibility: faker.helpers.arrayElement(['public', 'private', 'connections'])
          },
          lastActive: faker.date.recent(),
          status: 'active'
        });
      })
    );
    console.log('Created regular users');

    // Create professional users
    const proUsers = await Promise.all(
      Array(20).fill(null).map(async () => {
        return User.create({
          email: faker.internet.email(),
          name: faker.person.fullName(),
          image: getRandomProfileImage(),
          isPro: true,
          providers: [{
            name: 'google',
            providerId: faker.string.uuid(),
            lastLogin: faker.date.recent()
          }],
          contact: {
            phone: faker.phone.number(),
            address: {
              street: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              zip: faker.location.zipCode(),
              country: 'USA'
            }
          },
          businessInfo: {
            companyName: faker.company.name(),
            yearsInBusiness: faker.number.int({ min: 1, max: 30 }),
            license: faker.string.alphanumeric(8).toUpperCase(),
            insurance: 'Licensed and Insured',
            specialties: getRandomSpecialties(),
            serviceArea: getRandomServiceAreas(),
            website: faker.internet.url(),
            phone: faker.phone.number()
          },
          preferences: {
            notifications: {
              email: true,
              push: true,
              marketing: true
            },
            visibility: 'public'
          },
          lastActive: faker.date.recent(),
          status: 'active'
        });
      })
    );
    console.log('Created professional users');

    // Create projects for regular users
    const projects = await Promise.all(
      regularUsers.map(async (user) => {
        const contractor = faker.helpers.arrayElement(proUsers);
        const project = await Project.create({
          title: getRandomProjectTitle(),
          description: getRandomProjectDescription(),
          owner: user._id,
          contractor: contractor._id,
          status: faker.helpers.arrayElement(['planning', 'in_progress', 'completed']),
          tags: faker.helpers.arrayElements(['renovation', 'remodel', 'new construction', 'repair', 'design'], 2),
          images: getRandomWorkImages(faker.number.int({ min: 2, max: 5 })),
          metadata: {
            budget: faker.number.int({ min: 5000, max: 100000 }),
            timeline: faker.helpers.arrayElement(['1-2 weeks', '1 month', '2-3 months', '3-6 months']),
            location: `${faker.location.city()}, ${faker.location.state()}`
          },
          interactions: {
            views: faker.number.int({ min: 10, max: 1000 }),
            saves: faker.number.int({ min: 0, max: 50 }),
            lastViewed: faker.date.recent(),
            viewHistory: Array(5).fill(null).map(() => ({
              user: faker.helpers.arrayElement([...regularUsers, ...proUsers])._id,
              timestamp: faker.date.recent()
            })),
            savedBy: faker.helpers.arrayElements(regularUsers, faker.number.int({ min: 0, max: 5 })).map(u => u._id)
          },
          milestones: Array(faker.number.int({ min: 3, max: 6 })).fill(null).map(() => ({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(['pending', 'in_progress', 'completed']),
            dueDate: faker.date.future(),
            completedDate: faker.helpers.maybe(() => faker.date.recent())
          })),
          updates: []
        });

        // Create project updates
        const updateCount = faker.number.int({ min: 2, max: 5 });
        const updates = [];
        
        const updateTypes = [
          'Progress Update',
          'Milestone Reached',
          'Schedule Update',
          'Material Selection',
          'Design Review',
          'Inspection Completed',
          'Phase Completion'
        ];
        
        for (let i = 0; i < updateCount; i++) {
          const updateType = faker.helpers.arrayElement(updateTypes);
          const update = {
            title: updateType,
            content: getRandomUpdateContent(updateType),
            date: faker.date.recent({ days: 30 }),
            attachments: faker.number.int({ min: 0, max: 2 }) > 0 ? [{
              name: `${updateType.toLowerCase().replace(' ', '-')}-doc.pdf`,
              url: `https://example.com/documents/${faker.string.uuid()}.pdf`,
              type: 'application/pdf'
            }] : []
          };
          updates.push(update);
        }
        
        await Project.findByIdAndUpdate(project._id, { updates });

        // Create review for completed projects
        if (project.status === 'completed') {
          await Review.create({
            project: project._id,
            owner: user._id,
            contractor: contractor._id,
            rating: faker.number.int({ min: 3, max: 5 }),
            title: getRandomReviewTitle(),
            content: getRandomReviewContent(faker.number.int({ min: 3, max: 5 })),
            status: 'published',
            helpful: {
              count: faker.number.int({ min: 0, max: 20 }),
              users: faker.helpers.arrayElements(regularUsers, faker.number.int({ min: 0, max: 5 })).map(u => u._id)
            },
            images: getRandomWorkImages(faker.number.int({ min: 0, max: 3 })),
            responses: project.rating >= 4 ? [{
              author: contractor._id,
              content: `Thank you for your feedback! We're thrilled to have worked with you on your ${project.title.toLowerCase()}. Your satisfaction means everything to us, and we appreciate you taking the time to share your experience.`,
              date: faker.date.recent({ days: 7 }),
              isContractor: true
            }] : [{
              author: contractor._id,
              content: `Thank you for your honest feedback. We appreciate your comments and will use them to improve our services.`,
              date: faker.date.recent({ days: 7 }),
              isContractor: true
            }],
            metadata: {
              projectStage: 'completed',
              completionDate: faker.date.recent(),
              verifiedPurchase: true,
              categories: project.tags
            }
          });
        }

        return project;
      })
    );
    console.log('Created projects and reviews');

    // Create some user interactions
    await Promise.all(
      Array(50).fill(null).map(async () => {
        const user = faker.helpers.arrayElement([...regularUsers, ...proUsers]);
        const project = faker.helpers.arrayElement(projects);
        
        return UserInteraction.create({
          userId: user._id,
          type: faker.helpers.arrayElement(['project_view', 'profile_view', 'search', 'save']),
          targetId: project._id,
          targetModel: 'Project',
          metadata: {
            source: faker.helpers.arrayElement(['search', 'profile', 'recommendation']),
            duration: faker.number.int({ min: 30, max: 300 })
          }
        });
      })
    );
    console.log('Created user interactions');

    // Create some saved items
    await Promise.all(
      Array(30).fill(null).map(async () => {
        const user = faker.helpers.arrayElement(regularUsers);
        const item = faker.helpers.arrayElement([
          ...projects.map(p => ({ id: p._id, type: 'Project' })),
          ...proUsers.map(u => ({ id: u._id, type: 'User' }))
        ]);
        
        return UserSavedItem.create({
          userId: user._id,
          itemId: item.id,
          itemType: item.type
        }).catch(err => {
          if (err.code !== 11000) { // Ignore duplicate key errors
            throw err;
          }
        });
      })
    );
    console.log('Created saved items');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
