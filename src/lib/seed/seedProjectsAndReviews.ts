import mongoose from 'mongoose';
import dbConnect from '../dbConnect';
import User from '../models/User';
import Project from '../models/Project';
import Review from '../models/Review';

async function seedProjectsAndReviews() {
  try {
    await dbConnect();
    console.log('Connected to database for seeding...');

    // Find professional users
    const professionals = await User.find({ isPro: true });
    if (professionals.length === 0) {
      throw new Error('No professional users found');
    }

    const ownerId = new mongoose.Types.ObjectId("67447c40b64f38d6720806b7");

    // Create 5 projects
    const projectData = [
      {
        title: "Kitchen Renovation",
        description: "Complete kitchen remodel including new cabinets, countertops, and appliances",
        status: "completed",
        tags: ["kitchen", "renovation", "remodel"],
      },
      {
        title: "Bathroom Upgrade",
        description: "Master bathroom renovation with new fixtures and tiling",
        status: "completed",
        tags: ["bathroom", "plumbing", "tiles"],
      },
      {
        title: "Deck Construction",
        description: "New outdoor deck construction with composite materials",
        status: "completed",
        tags: ["outdoor", "deck", "construction"],
      },
      {
        title: "Living Room Makeover",
        description: "Living room redesign including built-in shelving and fireplace",
        status: "completed",
        tags: ["living room", "carpentry", "design"],
      },
      {
        title: "Garage Conversion",
        description: "Converting garage into a home office space",
        status: "completed",
        tags: ["conversion", "renovation", "office"],
      }
    ];

    const createdProjects = [];
    
    for (const project of projectData) {
      // Randomly select a contractor for each project
      const contractor = professionals[Math.floor(Math.random() * professionals.length)];
      
      const newProject = await Project.create({
        ...project,
        owner: ownerId,
        contractor: contractor._id,
        metadata: {
          budget: Math.floor(Math.random() * 50000) + 10000,
          timeline: "2-3 months",
          location: "San Francisco, CA"
        }
      });
      
      createdProjects.push(newProject);
      console.log(`Created project: ${project.title}`);
    }

    // Create 3 reviews from different contractors
    const reviewData = [
      {
        title: "Excellent client to work with",
        content: "Great communication throughout the project. Clear vision and timely payments.",
        rating: 4.8
      },
      {
        title: "Smooth project execution",
        content: "Professional interaction and well-organized project management.",
        rating: 5.0
      },
      {
        title: "Highly recommended client",
        content: "Detailed project requirements and respectful collaboration.",
        rating: 4.7
      }
    ];

    // Use first 3 projects for reviews
    for (let i = 0; i < 3; i++) {
      const project = createdProjects[i];
      const review = reviewData[i];
      
      await Review.create({
        project: project._id,
        owner: ownerId,
        contractor: project.contractor,
        rating: review.rating,
        title: review.title,
        content: review.content,
        status: "published",
        metadata: {
          projectStage: "completed",
          completionDate: new Date(),
          verifiedPurchase: true
        }
      });
      
      console.log(`Created review for project: ${project.title}`);
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedProjectsAndReviews();
