import prisma from './prisma';
import { Comment } from '@prisma/client';


export type CommentWithUser = Omit<Comment, 'createdAt'> & {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: string;
  };
  createdAt: Date | string;
};

export async function getComments(postId: number): Promise<CommentWithUser[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          password: true,
          role: true,
        },
      },
    },
  });

  return comments.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));
}
