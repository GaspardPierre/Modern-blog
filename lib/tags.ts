import prisma from './prisma'

export async function getAllTags() {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      posts: true,
      videos: true,
      createdAt: true, 
      updatedAt: true, 
      _count: {
        select: { posts: true }
      }
    }
  })

  return tags.map(tag => ({
    ...tag,
    count: tag._count.posts
  }))
}
