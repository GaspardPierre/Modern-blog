
import prisma from './prisma'
import { Post, Tag } from '@/types'

export async function getAllPosts(limit = 10, excerptWordLimit = 60): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  return posts.map(post => ({
    ...post,
    excerpt: createExcerpt(post.content, excerptWordLimit),
    slug: post.id.toString(),
  }))
}

function createExcerpt(content: string, wordLimit: number): string {
  const words = content.split(/\s+/)
  if (words.length <= wordLimit) {
    return content
  }
  return words.slice(0, wordLimit).join(' ') + '...'
}
export async function createPost(data: {
  title: string;
  content: string;
  authorId: number;
  published?: boolean;
  excerpt?: string;
  coverImage?: string;
  tagIds?: number[];
}): Promise<Post> {
  console.log("CreatePost function called", data);
  const { title, content, authorId, published, excerpt, coverImage, tagIds } = data

  if (!title || !content || !authorId) {
    console.error("Missing required fields");
    throw new Error('Missing required fields')
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      published: published || false,
      excerpt: excerpt || content.substring(0, 150) + '...',
      slug,
      coverImage,
      tags: tagIds ? {
        connect: tagIds.map(id => ({ id }))
      } : undefined
    },
    include: { author: true, tags: true },
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

export async function getPostById(id: number) : Promise<Post | null> {
  return await prisma.post.findUnique({
    where: {id},
    include: {
      author: true,
      tags: true,
    }
  })
}

export async function updatePost(id: number, data: {
  title: string;
  content: string;
  authorId: number;
  published?: boolean;
  excerpt?: string;
  coverImage?: string;
  tagIds?: number[];
}): Promise<Post> {
  const { title, content, authorId, published, excerpt, coverImage, tagIds } = data

  if (!title || !content || !authorId) {
    throw new Error('Missing required fields')
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      authorId,
      published: published || false,
      excerpt: excerpt || content.substring(0, 150) + '...',
      slug,
      coverImage,
      tags: tagIds ? {
        set: tagIds.map(id => ({ id }))
      } : undefined
    },
    include: { author: true, tags: true },
  })
}

export async function deletePost(id: number): Promise<void> {
  await prisma.post.delete({
    where: { id },
  })
}