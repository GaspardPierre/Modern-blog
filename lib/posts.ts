
import prisma from './prisma'
import { Post, Tag } from '@/types'

export async function getAllPosts(limit = 10) : Promise<Post[]> { 
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  return posts.map(post => ({
    ...post,
    excerpt: post.content.split('\n\n').slice(0, 2).join('\n\n') + '...', // Prend les deux premiers paragraphes
    slug: post.id.toString(), // ou utilisez un champ slug si vous en avez un
  }))
}

export async function createPost(data: {
  title: string;
  content: string;
  authorId: number;
  published?: boolean;
}): Promise<Post> {
  const { title, content, authorId, published } = data

  if (!title || !content || !authorId) {
    throw new Error('Missing required fields')
  }

  return await prisma.post.create({
    data: {
      title,
      content,
      published: published || false,
      author: { connect: { id: authorId } },
    },
    include: { author: true },
  })
}



export async function getPostBySlug(slugOrId: string): Promise<Post | null> {
  try {
    const isNumeric = /^\d+$/.test(slugOrId);
    const post = await prisma.post.findFirst({
      where: isNumeric 
        ? { id: parseInt(slugOrId) } 
        : { slug: slugOrId },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            bio: true,
            avatar: true
          },
        },
        tags: true,
      },
    })

    if (!post) {
      console.log(`Post not found for slug/id: ${slugOrId}`);
      return null;
    }

    return {
      ...post,
      author: {
        ...post.author,
        name: `${post.author.firstName} ${post.author.lastName}`,
      },
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPostsByTag(tagSlug: string): Promise<{ posts: Post[], tag: Tag | null }> {
  try {
    const tag = await prisma.tag.findUnique({
      where: { slug: tagSlug },
      include: {
        posts: {
          where: { published: true },
          include: {
            author: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            tags: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!tag) {
      return { posts: [], tag: null }
    }

    const posts = tag.posts.map(post => ({
      ...post,
      author: {
        ...post.author,
        name: `${post.author.firstName} ${post.author.lastName}`,
      },
      excerpt: post.excerpt || post.content.substring(0, 150) + '...',
    }))

    return { posts, tag }
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    throw error
  }
}