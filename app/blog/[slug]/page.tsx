import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/posts';
import MDXComponents from '@/components/MDXComponents';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock } from 'lucide-react';
import TableOfContents from '@/components/ui/TableOfContent';
import { addIdsToHeadings } from '@/lib/markdown';
import { CommentWithUser, getComments } from '@/lib/comments';

import CommentsComponent from '@/components/CommentsComponent';
import Tags from '@/components/ui/tag';

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title };
}

export default async function BlogPost({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const contentWithIds = addIdsToHeadings(post.content);

  const comments = await getComments(post.id);
  
  const commentsWithPost: CommentWithUser[] = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    userId: comment.userId,
    postId: comment.postId,
    user: {
      id: comment.user.id,
      name: comment.user.name,
      email: comment.user.email,
      emailVerified: comment.user.emailVerified,
      image: comment.user.image,
      password: comment.user.password,
      role: comment.user.role,
    }
  }));

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
    <article className="max-w-4xl mx-auto px-4 py-8">
         <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

   

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {post.author && (
            <>
              <Image
                src={post.author.avatar || '/placeholder-avatar.png'}
                alt={post.author.name || 'Author'}
                width={40}
                height={40}
                className="rounded-full mr-3"
              /> 
            </>
          )}
          <span className="text-gray-500">|</span>
          <span className="ml-2 text-gray-500">{formatDate(post.createdAt)}</span>
        </div>
        <span className="text-gray-500">{readingTime} min read</span>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-6">
          <Tags tags={post.tags} />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-12">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>

      <div className="border-t border-gray-200 pt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Share this article</h2>
        {/* Ajoutez ici vos boutons de partage social */}
      </div>

      <CommentsComponent postId={post.id} initialComments={commentsWithPost} />
    </article>
    <TableOfContents content={post.content} />
      </div>
    </div>
  );
}