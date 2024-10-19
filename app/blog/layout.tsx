import TagCloud from '@/components/TagCloud'
import BackButton from '@/components/BackButton'
import { getAllTags } from '@/lib/tags'

const MainContent = async ({ children }: { children: React.ReactNode }) => {
  const tags = await getAllTags()

  return (
    <div className="flex flex-col w-full">
      <main className="flex-grow md:w-full md:p-8">
        {children}
      </main>
      <aside className="w-full md:hidden mt-8">
        <TagCloud tags={tags} isMainBlogPage={true} />
        <BackButton />
      </aside>
    </div>
  )
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getAllTags()

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="hidden md:block w-1/4 md:min-w-[250px] mt-8 md:mt-0">
        <TagCloud tags={tags} isMainBlogPage={true} />
        <BackButton />
      </aside>
      <MainContent>{children}</MainContent>
    </div>
  )
}