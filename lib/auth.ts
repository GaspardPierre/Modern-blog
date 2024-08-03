import { compare, hash } from 'bcrypt';
import prisma from './prisma';
import { User } from '@/types'
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


export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } })
  console.log("User found:", user) // Ajoutez ce log
  return user
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
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