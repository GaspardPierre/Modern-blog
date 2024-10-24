import { getPostsByTag } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/ui/pagination'
import { getPaginationInfo } from '@/lib/pagination'
import { Post } from '@/app/types'

const POSTS_PER_PAGE = 10;

export default async function TagPage({ 
  params, 
  searchParams 
}: { 
  params: { tagname: string },
  searchParams: { page?: string }
}) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const { posts, tag, totalPosts } = await getPostsByTag(params.tagname, currentPage, POSTS_PER_PAGE);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const paginationInfo = getPaginationInfo(totalPosts, currentPage, POSTS_PER_PAGE);

  console.log("paginationInfo", paginationInfo);

  const adaptPostForArticleCard = (post: Post) => ({
    id: post.id.toString(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    author: {
      name: post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Unknown Author'
    },
    createdAt: post.createdAt,
    // Vous pouvez ajouter readingTime ici si nécessaire
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Articles classés "{tag.name}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={adaptPostForArticleCard(post)} />
          ))}
        </div>
      </section>
      <Pagination 
        paginationInfo={paginationInfo} 
        basePath={`/blog/tag/${params.tagname}`}
      />
    </div>
  );
}