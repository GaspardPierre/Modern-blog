import prisma from './prisma'

export async function getAuthors() {
  return await prisma.author.findMany()
}