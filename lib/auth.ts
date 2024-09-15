import { compare, hash } from 'bcrypt';
import prisma from './prisma';
import { User as NextAuthUser, Session, Account } from "next-auth";


interface UserWithPassword extends NextAuthUser {
  password?: string | null;
}

export async function getUserByEmail(email: string): Promise<UserWithPassword | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      accounts: true,
      sessions: true,
      comments: true,
    },
  });

  return user;
}


export async function createUser(email: string, password: string, role: 'USER' | 'ADMIN' = 'USER') {
  const hashedPassword = await hash(password, 10);
  console.log(`Creating user with email: ${email}, role: ${role}`);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });
}




export async function verifyPassword(user: UserWithPassword, password: string): Promise<boolean> {
  if (!user.password) {
    console.log("User has no password")
    return false
  }
  
  try {
    const isValid = await compare(password, user.password)
    console.log("Password verification result:", isValid)
    return isValid
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}