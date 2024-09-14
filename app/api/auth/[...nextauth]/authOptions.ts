import { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { JWT } from 'next-auth/jwt';
import { Account, User , Session} from 'next-auth';
import { getUserByEmail, verifyPassword } from "@/lib/auth";

//google provider
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Google client ID and secret must be defined");
}

const isDevelopment = process.env.NODE_ENV === 'development';
const secureOption = !isDevelopment;
export type AuthenticatedUser = {
  id: string;
  email: string | null;
  role: string;
  name: string | null;
};



export const authOptions : AuthOptions = {
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: secureOption, // Utilisation de la variable définie
        },
      },
      callbackUrl: {
        name: `next-auth.callback-url`,
        options: {
          sameSite: 'lax',
          path: '/',
          secure: secureOption, // Utilisation de la variable définie
        },
      },
      csrfToken: {
        name: `next-auth.csrf-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: secureOption, // Utilisation de la variable définie
        },
      },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials): Promise<AuthenticatedUser | null> {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            return null;
          }
          try {
            const user = await getUserByEmail(credentials.email);
            if (!user) {
              console.log("User not found");
              return null;
            }
            const isValid = await verifyPassword(user, credentials.password);
            if (!isValid) {
              console.log("Invalid password");
              return null;
            }
            console.log("User authenticated:", user);
            return { 
              id: user.id.toString(), 
              email: user.email || null, 
              role: user.role,
              name: user.name || null,
            };
          } catch (error) {
            console.error("Error in authorize function:", error);
            return null;
          }
        }
      }),
      GoogleProvider({
        clientId: clientId,
        clientSecret: clientSecret,
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: 'USER',
          };
        },
      }),
    ],
    session: {
      strategy: 'jwt' as SessionStrategy, 
    },
    callbacks: {
      async jwt({
        token,
        user,
        account,
      }: {
        token: JWT;
        user?: User | null;
        account?: Account | null;
      }) {
        if (user) {
          token.role = user.role;
          token.id = user.id;
        }
        if (account?.provider === 'google' && !token.role) {
          const email = token.email;
          if (email) { // Vérifie que l'email n'est ni null ni undefined
            const dbUser = await prisma.user.findUnique({ where: { email } });
            if (dbUser) {
              token.role = dbUser.role;
            } else {
              token.role = 'USER';
            }
          } else {
            console.error("Email is null or undefined.");
          }
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role || 'USER';
        return session;
      },
    },
  
    pages: {
      signIn: '/login',
    },
    events: {
      async createUser({ user }: { user: User }) {
        if (!user.role) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'USER' },
          });
        }
        console.log("User created:", user);
      },
    },
  }
  