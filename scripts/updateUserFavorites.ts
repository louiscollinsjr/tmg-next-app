import dbConnect from '../src/lib/dbConnect';
import User from '../src/lib/models/User';

async function updateUserFavorites() {
  try {
    await dbConnect();
    console.log('Connected to database');

    const users = await User.find({});
    console.log(`Found ${users.length} users to update`);

    let favoritesCount = 0;
    for (const user of users) {
      // 20% chance of being favorite
      const isFavorite = Math.random() < 0.2;
      if (isFavorite) favoritesCount++;
      
      await User.updateOne(
        { _id: user._id },
        { 
          $set: { 
            isFavorite,
            updatedAt: new Date()
          }
        }
      );
      console.log(`Updated user ${user.name} - isFavorite: ${isFavorite}${user.isPro ? ' (Professional)' : ''}`);
    }

    console.log('\nSummary:');
    console.log(`Total users updated: ${users.length}`);
    console.log(`Users marked as favorite: ${favoritesCount} (${((favoritesCount/users.length) * 100).toFixed(1)}%)`);
    console.log(`Users not marked as favorite: ${users.length - favoritesCount} (${(((users.length - favoritesCount)/users.length) * 100).toFixed(1)}%)`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating user favorites:', error);
    process.exit(1);
  }
}

updateUserFavorites();
