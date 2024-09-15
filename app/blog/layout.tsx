
import TagCloud from '@/components/TagCloud'
import Separator from '@/components/Separator'
import { getAllTags } from '@/lib/tags'

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getAllTags()

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-full md:w-1/6 md:min-w-[250px] mt-8 md:mt-0">
        <TagCloud tags={tags} />
      </aside>
      <Separator />
      <main className="flex-grow md:w-5/6 md:p-8">
        {children}
      </main>
    </div>
  )
}