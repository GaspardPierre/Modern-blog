import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
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
    readingTime?: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const coverImage = post.coverImage || "/placeholder-image.jpg";
  const excerpt = post.excerpt || "Pas de description disponible";
  const createdAt = typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="p-4">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-3">{post.author.name}</span>
          <span className="mr-3">|</span>
          <span className="mr-3">{formatDate(createdAt)}</span>
          {post.readingTime && (
            <>
              <span className="mr-3">|</span>
              <Clock size={14} className="mr-1" />
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </div>
      <div className="relative h-64 md:h-80">
        <Image
          src={coverImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link href={`/blog/${post.slug}`} className="flex items-center text-primary hover:text-primary-dark transition-colors">
          <span className="mr-2">Lire la suite</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;