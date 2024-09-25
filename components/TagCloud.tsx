import React from "react";
import Link from "next/link";
import { Tag } from "@/app/types";

interface TagCloudProps {
  tags: Tag[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(tag => tag.count || 0));

  const getTagSize = (count: number) => {
    const minSize = 0.5;
    const maxSize = 1.1;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  return (
    <div className="rounded-lg p-2 sm:p-4 sticky top-16">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-text">Explorer les sujets...</h2>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.slug}`}
            className="group"
          >
            <span className="inline-block transition-all duration-200 ease-in-out">
              <span 
                className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-600 group-hover:from-primary-500 group-hover:to-secondary-700"
                style={{ fontSize: `${getTagSize(tag.count || 0)}em` }}
              >
                {tag.name.toUpperCase()}
              </span>
              <span 
                className="ml-1 text-2xs sm:text-xs text-primary-500 group-hover:text-secondary-700"
                style={{ fontSize: `${getTagSize(tag.count || 0) * 0.8}em` }}
              >
                ({tag.count || 0})
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}