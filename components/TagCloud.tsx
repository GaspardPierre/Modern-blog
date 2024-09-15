import React from 'react'
import Link from 'next/link'
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
  PenTool // poésie
} from 'lucide-react'

import { Tag } from '@/app/types' 

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
  poésie: PenTool
}

const colorMap = {
  société: 'bg-blue-200 text-blue-800',
  science: 'bg-indigo-200 text-indigo-800',
  politique: 'bg-red-200 text-red-800',
  spiritualité: 'bg-purple-200 text-purple-800',
  divers: 'bg-green-200 text-green-800',
  insolite: 'bg-yellow-200 text-yellow-800',
  technologie: 'bg-gray-200 text-gray-800',
  "vie quotidienne": 'bg-pink-200 text-pink-800',
  environnement: 'bg-teal-200 text-teal-800',
  poésie: 'bg-cyan-200 text-cyan-800'
}

export default function TagCloud({ tags }: TagCloudProps) {
  const tagsWithCount = tags.map(tag => ({
    ...tag,
    count: tag.count ?? tag.posts.length + tag.videos.length
  }))

  const maxCount = Math.max(...tagsWithCount.map(tag => tag.count))
  console.log('TagCloud is rendering')

  return (
    <div className="rounded-lg p-4 sticky top-16">
      <h2 className="text-xl font-semibold mb-4">Explorer les sujets...</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const TagIcon = iconMap[tag.name.toLowerCase()] || Sparkles
          const colorClass = colorMap[tag.name.toLowerCase()] || 'bg-gray-100 text-gray-800'
          
          return (
            <Link 
              key={tag.id} 
              href={`/blog/tag/${tag.slug}`}
              className={`flex items-center px-3 py-1 rounded-full text-sm hover:opacity-80 transition-opacity ${colorClass}`}
            >
              <TagIcon size={16} className="mr-1" />
              {tag.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}