import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/ui/pagination'
import { getPaginationInfo } from '@/lib/pagination'

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const { posts, totalPosts } = await getAllPosts(currentPage);

  const paginationInfo = getPaginationInfo(totalPosts, currentPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
      <section>
        <h2 className="text-3xl font-bold mb-6">Tous les Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={{...post, id: post.id.toString()}} />
          ))}
        </div>
      </section>
      <Pagination paginationInfo={paginationInfo} basePath="/blog" />
    </div>
  )
}