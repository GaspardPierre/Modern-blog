import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/posts';
import MDXComponents from '@/components/MDXComponents';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CommentWithUser, getComments } from '@/lib/comments';
import { Tag } from '@/app/types';
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
    <article className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <Tags tags={post.tags} className="mb-2 sm:mb-4" />
        <div className="text-gray-600 text-sm sm:text-base">
          {formatDate(post.createdAt)} · {readingTime} min read
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">{post.title}</h1>

      {post.author && (
        <div className="flex items-center mb-4 sm:mb-8">
          <Image
            src={post.author.avatar || '/placeholder-avatar.png'}
            alt={post.author.name || 'Author'}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">{post.author.name || 'Anonymous'}</p>
      
          </div>
        </div>
      )}

      {post.coverImage && (
        <div className="mb-4 sm:mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 mt-8">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>

      <div className="border-t border-gray-200 pt-4 sm:pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Share this article</h2>
        {/* Ajoutez ici vos boutons de partage social */}
      </div>
      <CommentsComponent postId={post.id} initialComments={commentsWithPost} />
    </article>
  );
}