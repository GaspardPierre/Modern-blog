import React from "react";
import Link from "next/link";

import { Tag } from "@/app/types";

interface TagCloudProps {
  tags: Tag[];
}




export default function TagCloud({ tags }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(tag => tag.count || 0));

  const getTagSize = (count: number) => {
    const minSize = 0.3;
    const maxSize = 1;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  return (
    <div className="rounded-lg p-4 sticky top-16">
      <h2 className="text-2xl font-semibold mb-4 text-text">Explorer les sujets...</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.slug}`}
            className={`px-2 py-0 rounded-md bg-gradient-to-r from-primary-400 to-secondary-600 text-white hover:text-cyan-50 hover:to-secondary-700 transition-colors`}
            style={{ fontSize: `${getTagSize(tag.count || 0)}rem` }}
          >
            <span className="font-semibold">{tag.name.toUpperCase()}</span>
            <span className="ml-1 text-xs opacity-75">({tag.count || 0})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}