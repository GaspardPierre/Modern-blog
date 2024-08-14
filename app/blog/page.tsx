import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts } from '@/lib/posts'
import MDXComponents from '@/components/MDXComponents'

export default async function BlogPage() {
  const posts = await getAllPosts(10) // Récupère les 10 derniers posts

  return (
    <>
      <div className="md:w-3/4">
        <h1 className="text-4xl font-bold mb-4">Latest</h1>
        <p className="text-gray-600 mb-6">Content for UX, product, and digital empathy experts</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <article key={post.id} className={index === 0 ? "md:col-span-2" : ""}>
              <Link href={`/blog/${post.slug}`}>
                <Image 
                  src={post.coverImage || '/placeholder.jpg'} 
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              </Link>
              <div className="prose prose-sm max-w-none mb-2">
                <MDXRemote 
                  source={post.excerpt} 
                  components={MDXComponents}
                  options={{
                    mdxOptions: {
                      development: process.env.NODE_ENV === 'development'
                    }
                  }}
                />
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
        {/* Ajoutez ici la section des articles tendance */}
      </section>
    </>
  )
}