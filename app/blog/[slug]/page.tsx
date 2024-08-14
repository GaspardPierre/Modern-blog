import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/posts'
import MDXComponents from '@/components/MDXComponents'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getComments } from '@/lib/comments'
import Comments  from'@/components/Comments'



interface Params {
  params: {
    slug: string
  }
}
export async function generateMetadata({ params }: Params) {
  console.log("Params:", params);
  const post = await getPostBySlug(params.slug)
  console.log("POST ", post)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title }
}

export default async function BlogPost({ params }: Params) {
  console.log("Page Params:", params);
  const post = await getPostBySlug(params.slug)
  console.log("Page Post:", post)
  if (!post) notFound()
    const comments = await getComments(post.id)

  const readingTime = Math.ceil(post.content.split(' ').length / 200) 
  const postUrl = `https://localhost:3000/blog/${params.slug}`

  const disqusConfig = {
    url: postUrl,
    identifier: params.slug,
    title: post.title
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-evently mb-8 space-y-4 md:space-y-0">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mr-3">
            {post.tags.map(tag => (
              <Link 
                key={tag.id} 
                href={`/blog/tag/${tag.slug}`}
                className="px-3 py-1 bg-primary text-white rounded-full text-sm hover:bg-opacity-90 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-gray-600 text-sm">
          {formatDate(post.createdAt)} · {readingTime} min read
        </div>
      </div>
      
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{post.title}</h1>
      
      <div className="flex items-center mb-8">
        <Image
          src={post.author.avatar || '/placeholder-avatar.png'}
          alt={post.author.name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-gray-900">{post.author.name}</p>
          <p className="text-gray-600 text-sm">{post.author.bio}</p>
        </div>
      </div>
      
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}
      
      <div className="prose prose-lg max-w-none mb-8">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Share this article</h2>
        {/* Ajoutez ici vos boutons de partage social */}
      </div>
      <Comments postId={post.id} initialComments={comments} />
    </article>
  )
}