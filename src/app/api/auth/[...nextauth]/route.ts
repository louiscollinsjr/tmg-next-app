import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
