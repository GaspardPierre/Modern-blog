import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { getUserByEmail, verifyPassword } from "@/lib/auth"
import { User } from '@/types'

const isDevelopment = process.env.NODE_ENV === 'development'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) : Promise< User | null > {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password")
          return null
        }
        try {
        const user = await getUserByEmail(credentials.email)
        if (!user) {
          console.log("User not found")
          return null
        }
        const isValid = await verifyPassword(user, credentials.password)
        if (!isValid) {
          console.log("Invalid password")
          return null
        }
        console.log("User authenticated:", user)
        return { 
          id: user.id.toString(), 
          email: user.email, 
          role: user.role,
          name: user.name // Assurez-vous d'inclure le nom si disponible
        }
      } catch (error) {
        console.error("Error in authorize function:", error)
        return null
      }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'USER',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        console.log("JWT created for user:", token)
      }
      if (account?.provider === 'google' && !token.role) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } })
        if (dbUser) {
          token.role = dbUser.role
        } else {
          token.role = 'USER'
        }
        console.log("JWT updated with role from DB:", token)
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role || 'USER'
        console.log("Session created for user:", session)
      } else {
        console.error("Session or user is undefined in session callback")
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  events: {
    async createUser({ user }) {
      if (!user.role) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'USER' },
        })
      }
      console.log("User created:", user)
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopment,
      },
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
