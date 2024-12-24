import { getAllPosts } from '@/lib/posts'
import { getAllTags } from '@/lib/tags'
import ArticleCard from '@/components/ArticleCard';
import TagCloud from '@/components/TagCloud'

export default async function HomePage() {
  const { posts } = await getAllPosts(1, 10); // Récupère les 10 derniers posts de la première page
  const tags = await getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TagCloud tags={tags} isMainBlogPage={false} />
      
      <section className="mt-12">
        <h2 className="text-3xl font-title font-bold mb-6">Derniers Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={{...post, id: post.id.toString()}} />
          ))}
        </div>
      </section>
    </div>
  );
}