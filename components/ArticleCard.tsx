import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  post: {
    id: string | number;
    slug: string;
    title: string;
    excerpt: string | null;
    coverImage: string | null;
    author: {
      name: string;
    };
    createdAt: string | Date;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const coverImage = post.coverImage || "/placeholder-image.jpg";
  const excerpt = post.œexcerpt || "Pas de description disponible";
  const createdAt = typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString();

  return (
    <Link href={`/blog/${post.slug}`} className="block h-[400px]">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md h-full flex flex-col">
        <div className="h-64 relative overflow-hidden">
          <Image
            src={coverImage}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col h-[calc(500px-16rem)]"> {/* Ajustez 16rem selon la hauteur de votre image */}
  <h3 className="text-xl font-semibold h-14 mb-2 line-clamp-2 overflow-hidden">{post.title}</h3>
  <div className="flex items-center text-sm text-gray-500 h-5 mb-2">
    <span className="mr-2">{post.author.name} |</span>
    <span>{formatDate(createdAt)}</span>
  </div>
  <p className="text-gray-600 text-sm flex-grow overflow-hidden line-clamp-3 mb-4">
    {post.excerpt}
  </p>
  <div className="flex items-center text-primary-600 mt-auto">
    <span className="mr-2">Lire la suite</span>
    <ArrowRight size={18} />
  </div>
</div>
      </div>
    </Link>
  );
};

export default ArticleCard;