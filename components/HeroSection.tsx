import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/app/types'
import { formatDate } from '@/lib/utils'
import { Button } from './ui/button'

interface HeroSectionProps {
  latestPosts: Post[]
}

export default function HeroSection({ latestPosts }: HeroSectionProps) {
  const featuredPost = latestPosts[0]
  const recentPosts = latestPosts.slice(1, 4)

  if (!featuredPost) return null

  return (
    <div className="relative overflow-hidden pt-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                HolyFire Journal
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Carefully selected articles about design, technology, and innovation. Subscribe to our newsletter for the latest updates.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/blog">
                <Button size="lg">
                  Browse Articles
                </Button>
              </Link>
            </div>
          </div>

          {/* Featured Post */}
          <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2">
            <div className="relative h-[300px] overflow-hidden rounded-xl lg:h-[400px] ">
              <Image
                src={featuredPost.coverImage || '/placeholder.jpg'}
                alt={featuredPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {featuredPost.author?.avatar && (
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name || ''}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">{featuredPost.author?.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(featuredPost.createdAt)}</p>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${featuredPost.slug}`} className="inline-flex">
                <Button>Read More</Button>
              </Link>
            </div>
          </div>

          {/* Recent Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group relative overflow-hidden rounded-lg border">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage || '/placeholder.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                    <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 mt-2 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}