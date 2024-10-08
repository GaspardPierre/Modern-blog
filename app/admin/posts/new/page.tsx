import NewPostForm from '@/components/NewPostForm'

import { getAuthors } from '@/lib/authors'
import { getAllTags } from '@/lib/tags'

export default async function NewPostPage() {
  const authors = await getAuthors()
  const tags = await getAllTags()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <NewPostForm authors={authors}  tags={tags}/>
    </div>
  )
}