import Link from 'next/link'

interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface TagCloudProps {
  tags: Tag[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(tag => tag.count))
  console.log('TagCloud is rendering')

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link 
            key={tag.id} 
            href={`/blog/tag/${tag.slug}`}
            className={`px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition-colors ${getFontSizeClass(tag.count, maxCount)}`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

function getFontSizeClass(count: number, maxCount: number): string {
  const size = Math.max(0.8, Math.min(2, 0.8 + (count / maxCount) * 1.2))
  return `text-[${size}rem]`
}