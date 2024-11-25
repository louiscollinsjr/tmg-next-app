import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import type { Session, User as NextAuthUser } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { createOrUpdateUser } from "@/lib/auth/utils"
import { verifyPassword } from "@/lib/auth/password"
import dbConnect from "@/lib/db/mongodb"
import User from "@/lib/models/User"

// Extend the built-in session types
interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    isPro?: boolean;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        
        if (!user || !user.password) {
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      
      if (user) {
        try {
          await createOrUpdateUser(user, account, profile);
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return false;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      // Cast the session to our extended type
      const extendedSession = session as ExtendedSession;
      
      if (!extendedSession.user.id) {
        extendedSession.user.id = '';
      }
      if (!extendedSession.user.isPro) {
        extendedSession.user.isPro = false;
      }
      
      if (extendedSession.user) {
        // Find the user in the database to get their MongoDB _id
        await dbConnect();
        let dbUser;
        
        if (token.sub) {
          // First try to find by providerId (for OAuth users)
          dbUser = await User.findOne({ providerId: token.sub });
          if (!dbUser) {
            // If not found, try to find by _id (for credentials users)
            try {
              dbUser = await User.findById(token.sub);
            } catch (error) {
              // If token.sub is not a valid ObjectId, try to find by email
              dbUser = await User.findOne({ email: extendedSession.user.email });
            }
          }
        }

        if (dbUser) {
          extendedSession.user.id = dbUser._id.toString();
          extendedSession.user.isPro = dbUser.isPro;
        }
      }
      return extendedSession;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
