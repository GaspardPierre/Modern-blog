import prisma from './prisma'
import { Tag, Post } from '@/app/types/index'

export async function getAllTags(): Promise<Tag[]> {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: {
              where: {
                published: true
              }
            }
          }
        },
        posts: {
          where: {
            published: true
          },
          select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            excerpt: true,
            published: true,
            authorId: true,
            coverImage: true,
            createdAt: true,
            updatedAt: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    const formattedTags: Tag[] = tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: tag._count.posts,
      posts: tag.posts as Post[],
      videos: [], // Si vous n'utilisez pas les vidéos, vous pouvez laisser un tableau vide
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt
    }))

    console.log('Tags with counts:', formattedTags.map(tag => ({
      name: tag.name,
      slug: tag.slug,
      count: tag.count,
      actualPostsLength: tag.posts.length
    })))

    return formattedTags
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}