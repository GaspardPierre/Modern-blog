// @/lib/adminStats.ts
import prisma from './prisma'
import { formatDistanceToNow } from 'date-fns'
import { Post, User, Comment } from '@prisma/client'

export async function getPostCount(): Promise<number> {
  return await prisma.post.count()
}

export async function getUserCount(): Promise<number> {
  return await prisma.user.count()
}

export async function getNewCommentCount(): Promise<number> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  return await prisma.comment.count({
    where: {
      createdAt: {
        gte: oneDayAgo
      }
    }
  })
}

type MostCommentedPost = {
  id: number;
  title: string;
  commentCount: number;
}

export async function getMostCommentedPosts(limit: number = 5): Promise<MostCommentedPost[]> {
  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: {
      comments: {
        _count: 'desc'
      }
    },
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          comments: true
        }
      }
    }
  })

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    commentCount: post._count.comments
  }))
}

type RecentActivity = {
  action: string;
  user: string;
  time: string;
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  const recentPosts = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true
    }
  })

  return recentPosts.map(post => ({
    action: 'New post created',
    user: `${post.author.firstName} ${post.author.lastName}`,
    time: formatRelativeTime(post.createdAt)
  }))
}

function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}