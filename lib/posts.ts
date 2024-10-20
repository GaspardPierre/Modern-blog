import prisma from './prisma'
import { Post, Tag, Author, PrismaTag } from '@/app/types'

type PrismaPostWithAuthorAndTags = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    bio: string | null;
    website: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

interface PostWithAuthor extends Omit<Post, 'author'> {
  author: Author;
}

export async function getAllPosts(page = 1, limit = 10, excerptWordLimit = 60): Promise<{ posts: PostWithAuthor[], totalPosts: number }> {
  const skip =  Math.max(0, page - 1) * limit;
  
  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    }),
    prisma.post.count(),
  ]);

  const adaptedPosts = posts.map((post: PostWithAuthor) => ({
    ...post,
    author: {
      id: post.author.id,
      firstName: post.author.firstName,
      lastName: post.author.lastName,
      name: `${post.author.firstName} ${post.author.lastName}`,
      age: post.author.age,
      bio: post.author.bio,
      website: post.author.website,
      avatar: post.author.avatar,
      createdAt: post.author.createdAt,
      updatedAt: post.author.updatedAt,
    },
    excerpt: createExcerpt(post.content, excerptWordLimit),
    slug: post.id.toString(),
  }));

  return { posts: adaptedPosts, totalPosts };
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
  const createdPost = await prisma.post.create({
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
      } : undefined,
    },
    include: { author: true, tags: true },
  })
  const adaptedPost: Post = {
    ...createdPost,
    tags: createdPost.tags.map((prismatag : PrismaTag) => ({
      ...prismatag,
      posts: [],  
      videos: []  
    }))
  }

  return adaptedPost
}
export async function updatePost(id: number, data: {
  title: string;
  content: string;
  authorId: number;
  published?: boolean;
  excerpt?: string;
  coverImage?: string | null;
  tagIds?: number[];
}): Promise<Post> {
  const { title, content, authorId, published, excerpt, coverImage, tagIds } = data;

  if (!title || !content || !authorId) {
    throw new Error('Missing required fields');
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const updatedPost = await prisma.post.update({
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
  });

  const adaptedPost: Post = {
    ...updatedPost,
    author: {
      id: updatedPost.author.id,
      firstName: updatedPost.author.firstName,
      lastName: updatedPost.author.lastName,
      name: `${updatedPost.author.firstName} ${updatedPost.author.lastName}`,
      age: updatedPost.author.age,
      bio: updatedPost.author.bio || '',
      website: updatedPost.author.website,
      avatar: updatedPost.author.avatar,
      createdAt: updatedPost.author.createdAt,
      updatedAt: updatedPost.author.updatedAt,
    },
    tags: updatedPost.tags.map((prismaTag: PrismaTag) => ({
      ...prismaTag,
      posts: [],
      videos: []
    }))
  };

  return adaptedPost;
}

export async function getPostBySlug(slugOrId: string): Promise<Post | null> {
  try {
    const isNumeric = /^\d+$/.test(slugOrId);
    const post = await prisma.post.findFirst({
      where: isNumeric 
        ? { id: parseInt(slugOrId) } 
        : { slug: slugOrId },
      include: {
        author: true,
        tags: true,
      },
    })

    if (!post) {
      console.log(`Post not found for slug/id: ${slugOrId}`);
      return null;
    }
    const adaptedAuthor: Author = {
      id: post.author.id,
      firstName: post.author.firstName,
      lastName: post.author.lastName,
      name: `${post.author.firstName} ${post.author.lastName}`,
      age: post.author.age,
      bio: post.author.bio,
      website: post.author.website,
      avatar: post.author.avatar,
      createdAt: post.author.createdAt,
      updatedAt: post.author.updatedAt,
    };

    const adaptedTags: Tag[] = post.tags.map((prismaTag: PrismaTag) => ({
      ...prismaTag,
      posts: [],  
      videos: []  
    }));
    
    return {
      ...post,
      author: adaptedAuthor,
      tags: adaptedTags,
    } as Post;
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
export async function getPostsByTag(tagSlug: string, page = 1, limit = 9): Promise<{ posts: Post[], tag: Tag | null, totalPosts: number }> {
  console.log('Fetching posts for tag:', tagSlug, 'Page:', page, 'Limit:', limit);
  try {
    const skip =  Math.max(0, page - 1) * limit;

    const tagWithPosts = await prisma.tag.findUnique({
      where: { slug: tagSlug },
      include: {
        posts: {
          where: { published: true },
          include: {
            author: true,
            tags: true,
          },
          orderBy: { createdAt: 'desc' },
          skip: skip,
          take: limit,
        },
        _count: {
          select: { posts: true }
        }
      },
    })

    console.log('Tag found:', tagWithPosts ? tagWithPosts.name : 'Not found');
    console.log('Number of posts:', tagWithPosts?.posts.length || 0);

    if (!tagWithPosts) {
      return { posts: [], tag: null, totalPosts: 0 }
    }

    const adaptedPosts: Post[] = tagWithPosts.posts.map((prismaPost: PrismaPostWithAuthorAndTags) => ({
      ...prismaPost,
      author: {
        id: prismaPost.author.id,
        firstName: prismaPost.author.firstName,
        lastName: prismaPost.author.lastName,
        name: `${prismaPost.author.firstName} ${prismaPost.author.lastName}`,
        age: prismaPost.author.age,
        bio: prismaPost.author.bio || '',
        website: prismaPost.author.website,
        avatar: prismaPost.author.avatar,
        createdAt: prismaPost.author.createdAt,
        updatedAt: prismaPost.author.updatedAt,
      },
      excerpt: prismaPost.excerpt || prismaPost.content.substring(0, 150) + '...',
      tags: prismaPost.tags.map(tag => ({
        ...tag,
        posts: [],
        videos: [],
      })),
      coverImage: prismaPost.coverImage || null, 
    }))

    const adaptedTag: Tag = {
      ...tagWithPosts,
      posts: [],
      videos: [],
    }

    console.log('Adapted posts:', adaptedPosts.length);
    console.log('Total posts for this tag:', tagWithPosts._count.posts);

    return { 
      posts: adaptedPosts, 
      tag: adaptedTag, 
      totalPosts: tagWithPosts._count.posts 
    }
  } catch (error) {
    console.error('Error fetching posts by tag:', error)
    throw error
  }
}


export async function getPostById(id: number): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      tags: true,
    }
  })

  if (!post) return null;

  // Adapter l'objet author
  const adaptedAuthor: Author = {
    id: post.author.id,
    firstName: post.author.firstName,
    lastName: post.author.lastName,
    name: `${post.author.firstName} ${post.author.lastName}`,
    age: post.author.age,
    bio: post.author.bio || '',
    website: post.author.website,
    avatar: post.author.avatar,
    createdAt: post.author.createdAt,
    updatedAt: post.author.updatedAt,
  };

  // Adapter les tags
  const adaptedTags: Tag[] = post.tags.map(( prismaTag :PrismaTag ) => ({
    ...prismaTag,
    posts: [],  
    videos: []  
  }));

  // Retourner le post avec l'auteur et les tags adaptés
  const adaptedPost: Post = {
    ...post,
    author: adaptedAuthor,
    tags: adaptedTags,
  };

  return adaptedPost;
}

export async function deletePost(id: number): Promise<void> {
  await prisma.post.delete({
    where: { id },
  })
}