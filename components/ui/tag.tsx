import React from 'react';
import Link from 'next/link';
import { Tag } from '@/app/types';

interface TagsProps {
  tags?: Tag[];
  className?: string;
}

export default function Tags({ tags, className = '' }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.map(({ id, name, slug }) => (
        <Link
          key={id}
          href={`/blog/tag/${slug}`}
          className="px-3 py-1 bg-primary text-white rounded-full text-xs hover:bg-opacity-90 transition-all duration-400 ease-in-out "
        >
          {name}
        </Link>
      ))}
    </div>
  );
}