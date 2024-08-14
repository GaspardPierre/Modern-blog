import prisma from './prisma'

export async function getComments(postId: number) {
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
    include: {
      user: {
        select: { name: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return comments.map(comment => ({
    ...comment,
    createdAt: comment.createdAt.toISOString()
  }))
}