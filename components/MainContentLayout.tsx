
// components/MainContentLayout.tsx
import React from 'react'
import TagCloud from '@/components/TagCloud'
import { getAllTags } from '@/lib/tags'

export default async function MainContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getAllTags()

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="hidden md:block md:w-1/4 md:min-w-[250px] md:pr-8">
        <TagCloud tags={tags} isMainBlogPage={false} />
      </aside>
      <main className="flex-grow md:w-3/4">
        {children}
      </main>
      <aside className="w-full md:hidden mt-8">
        <TagCloud tags={tags} isMainBlogPage={false} />
      </aside>
    </div>
  )
}