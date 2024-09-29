// app/blog/tag/[tagname]/page.tsx

import { getPostsByTag } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import { ArticleCardProps } from '@/app/types';
import { Post } from '@/app/types'; // Assurez-vous d'importer le type Post

export default async function TagPage({ params }: { params: { tagname: string } }) {
  const { posts, tag } = await getPostsByTag(params.tagname);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const formatPostForArticleCard = (post: Post): ArticleCardProps['post'] => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    author: {
      name: post.author?.name || 'Anonymous',
    },
    createdAt: post.createdAt,
  });

  return (
    <div>
      <h1>Articles tagged with "{tag.name}"</h1>
      <div>
        {posts.map((post: Post) => (
          <ArticleCard key={post.id} post={formatPostForArticleCard(post)} />
        ))}
      </div>
    </div>
  );
}