import { Account, Profile, User as AuthUser } from 'next-auth';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db/mongodb';

export async function createOrUpdateUser(
  authUser: AuthUser,
  account: Account | null,
  profile?: Profile
) {
  await dbConnect();

  const userData = {
    email: authUser.email,
    name: authUser.name,
    image: authUser.image,
    providers: account ? [account.provider] : [],
    providerId: account?.providerAccountId,
  };

  try {
    // Try to find an existing user
    const existingUser = await User.findOne({ email: authUser.email });

    if (existingUser) {
      // Update existing user
      if (account && !existingUser.providers.includes(account.provider)) {
        existingUser.providers.push(account.provider);
      }
      
      // Update other fields if they've changed
      existingUser.name = userData.name;
      existingUser.image = userData.image;
      
      await existingUser.save();
      return existingUser;
    }

    // Create new user if none exists
    const newUser = await User.create({
      ...userData,
      isPro: false, // default to free tier
      createdAt: new Date(),
    });

    return newUser;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}
