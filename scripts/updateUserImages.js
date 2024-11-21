import dbConnect from '../src/lib/dbConnect.js';
import User from '../src/lib/models/User.js';

const professionalImages = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500', // Professional businessman
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500', // Professional businesswoman
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500', // Male professional portrait
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500', // Female professional portrait
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500', // Casual professional male
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500', // Professional woman smiling
  'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=500', // Construction professional
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=500', // Architect/contractor
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500', // Skilled tradesperson
  'https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=500', // Design professional
];

async function updateUserImages() {
  try {
    await dbConnect();
    console.log('Connected to database');

    const users = await User.find({ isPro: true });
    console.log(`Found ${users.length} professional users to update`);

    for (const user of users) {
      const randomImage = professionalImages[Math.floor(Math.random() * professionalImages.length)];
      
      await User.updateOne(
        { _id: user._id },
        { 
          $set: { 
            image: randomImage,
            updatedAt: new Date()
          }
        }
      );
      console.log(`Updated user ${user.name} with new image`);
    }

    console.log('Successfully updated all professional users with new images');
    process.exit(0);
  } catch (error) {
    console.error('Error updating user images:', error);
    process.exit(1);
  }
}

updateUserImages();
