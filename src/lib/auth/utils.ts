import { Account, Profile, User as AuthUser } from 'next-auth';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db/mongodb';

interface Provider {
  name: string;
  providerId: string;
  lastLogin: Date;
}

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
    providers: account ? [{
      name: account.provider,
      providerId: account.providerAccountId,
      lastLogin: new Date()
    }] : [],
  };

  try {
    // Try to find an existing user
    const existingUser = await User.findOne({ email: authUser.email });

    if (existingUser) {
      // Update existing user
      if (account) {
        // Check if this provider already exists
        const providerExists = existingUser.providers.some(
          (p: Provider) => p.name === account.provider && p.providerId === account.providerAccountId
        );

        if (!providerExists) {
          // Add new provider
          existingUser.providers.push({
            name: account.provider,
            providerId: account.providerAccountId,
            lastLogin: new Date()
          });
        } else {
          // Update lastLogin for existing provider
          const providerIndex = existingUser.providers.findIndex(
            (p: Provider) => p.name === account.provider && p.providerId === account.providerAccountId
          );
          if (providerIndex !== -1) {
            existingUser.providers[providerIndex].lastLogin = new Date();
          }
        }
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
      preferences: {
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        visibility: 'public'
      },
      status: 'active',
      lastActive: new Date()
    });

    return newUser;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}
