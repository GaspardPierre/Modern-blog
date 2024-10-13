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
  const coverImage = post.coverImage || "/placeholder-image.jpg"; // Assurez-vous d'avoir une image par défaut
  const excerpt = post.excerpt || "Pas de description disponible";
  const createdAt = typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString();

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
        <Image
          src={coverImage}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 sm:line-clamp-none">{post.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="mr-2">{post.author.name} |</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt}
          </p>
          <div className="flex items-center text-primary-600">
            <span className="mr-2">Lire la suite</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;