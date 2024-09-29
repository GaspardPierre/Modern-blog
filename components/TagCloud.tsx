import React from "react";
import Link from "next/link";
import { Tag } from "@/app/types";

interface TagCloudProps {
  tags: Tag[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(tag => tag.count || 0));

  const getTagSize = (count: number) => {
    const minSize = 0.7;
    const maxSize = 1.1;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Mots-Clés Populaires</h2>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.slug}`}
            className="group"
          >
            <span 
              className="relative inline-block transition-all duration-200 ease-in-out"
              style={{ 
                fontSize: `${getTagSize(tag.count || 0)}rem`,
              }}
            >
              <span className="relative z-10 text-text uppercase font-extrabold ">{tag.name} ({tag.count})</span>
              <span 
                className="absolute inset-0 -skew-y-3 z-0 bg-secondary-500 bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-200"
                style={{
                  borderRadius: '1em 0.1em',
                  padding: '0.2em 0.6em',
                  margin: '0 -0.5em',
                }}
              ></span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}