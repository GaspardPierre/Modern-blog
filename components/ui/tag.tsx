import React from "react";
import Link from "next/link";
import { Tag } from "@/app/types";

interface TagCloudProps {
  tags: Tag[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/blog/tag/${tag.slug}`}
          className="group relative inline-block mx-2"
        >
          <span className="relative z-10 text-text uppercase font-extrabold text-sm">
            {tag.name}
          </span>
          <span 
            className="absolute inset-0 -skew-y-3 z-0 bg-teal-800 bg-opacity-20 group-hover:bg-opacity-30 transition-colors duration-200"
            style={{
              borderRadius: '0.2em 0.8em',
              padding: '0.1em 0.6em',
              margin: '0 -0.3em',
            }}
          ></span>
        </Link>
      ))}
    </div>
  );
}