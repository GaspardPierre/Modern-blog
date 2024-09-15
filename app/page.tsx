import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts } from '@/lib/posts'
import MDXComponents from '@/components/MDXComponents'

export default async function HomePage() {
  const posts = await getAllPosts(5) // Récupère les 10 derniers posts

  return (
    <>
      <div className="md:w-full">
        <h1 className="text-4xl font-bold mb-4">The Hotjar blog</h1>
        <p className="text-gray-600 mb-6">Société, Politique, Spiritualité, Poésie</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <article key={post.id} className={index === 0 ? "md:col-span-2" : ""}>
              <Link href={`/blog/${post.slug}`}>
              <Image 
                  src={post.coverImage || '/placeholder.jpg'} 
                  alt={post.title}
                  width={500}
                  height={500}
                  className="w-full h-48 md:h-72 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              </Link>
              <div className="prose prose-sm max-w-none mb-2">
              {post.excerpt && (
                <MDXRemote 
                  source={post.excerpt} 
                  components={MDXComponents}
                  options={{
                    mdxOptions: {
                      development: process.env.NODE_ENV === 'development'
                    }
                  }}
                />
              )}
              </div>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Trending section */}
      <section id="trending" className="mt-12">
        <h2 className="text-2xl font-bold mb-4">TRENDING</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-semibold mb-2">{post.title}</h3>
              </Link>
              <p className="text-sm text-gray-600">
                {post.excerpt ? `${post.excerpt.substring(0, 100)}...` : 'No excerpt available'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}