import React from "react";
import Link from "next/link";
import {
  BookOpen, // société
  FlaskConical, // science
  Vote, // politique
  Heart, // spiritualité
  Sparkles, // divers
  Zap, // insolite
  Cpu, // technologie
  Coffee, // vie quotidienne
  Leaf, // environnement
  PenTool, // poésie
} from "lucide-react";

import { Tag } from "@/app/types";

interface TagCloudProps {
  tags: Tag[];
}

const iconMap = {
  société: BookOpen,
  science: FlaskConical,
  politique: Vote,
  spiritualité: Heart,
  divers: Sparkles,
  insolite: Zap,
  technologie: Cpu,
  "vie quotidienne": Coffee,
  environnement: Leaf,
  poésie: PenTool,
};

const colorMap = {
  société: 'bg-sky-900 text-white',        // Deep sky blue for a mature feel
  science: 'bg-indigo-800 text-white',     // Dark indigo for a serious, modern tone
  politique: 'bg-red-700 text-white',      // Darker red for a strong, yet professional look
  spiritualité: 'bg-purple-800 text-white', // Dark purple for a calming, balanced presence
  divers: 'bg-emerald-800 text-white',     // Deep emerald green for a natural and refined vibe
  insolite: 'bg-yellow-700 text-white',    // Muted golden yellow to signify importance without being too bright
  technologie: 'bg-gray-700 text-white',   // Dark gray for a sleek, tech-focused aesthetic
  "vie quotidienne": 'bg-pink-700 text-white', // Deep pink for a modern twist with elegance
  environnement: 'bg-teal-800 text-white', // Dark teal to symbolize nature in a sophisticated way
  poésie: 'bg-cyan-800 text-white'         // Deep cyan for a creative yet understated flair
}



export default function TagCloud({ tags }: TagCloudProps) {
  const tagsWithCount = tags.map((tag) => ({
    ...tag,
    count: tag.count ?? tag.posts.length + tag.videos.length,
  }));

  const maxCount = Math.max(...tagsWithCount.map((tag) => tag.count));
  console.log("TagCloud is rendering");

  return (
    <div className="rounded-lg p-4 sticky top-16">
      <h2 className="text-xl font-semibold mb-4">Explorer les sujets...</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const TagIcon =
            iconMap[tag.name.toLowerCase() as keyof typeof iconMap] || Sparkles;
          const colorClass =
            colorMap[tag.name.toLowerCase() as keyof typeof colorMap] ||
            "bg-gray-100 text-gray-800";

          return (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className={`flex items-center px-3 py-1 rounded-sm text-sm hover:opacity-80 transition-opacity ${colorClass}`}
            >
              <TagIcon size={16} className="mr-1" />
              {tag.name.toUpperCase()} ({tag.count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}
