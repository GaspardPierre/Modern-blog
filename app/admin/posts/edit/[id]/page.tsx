import { getPostById } from '@/lib/posts'
import { getAuthors } from '@/lib/authors'
import { getAllTags } from '@/lib/tags'
import EditPostForm from '@/components/EditPostForm'
import { Button } from '@/components/ui/button'
import { handleDeletePost } from '@/lib/serverActions'
import { serialize } from 'next-mdx-remote/serialize'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(parseInt(params.id))
  const authors = await getAuthors()
  const tags = await getAllTags()

  if (!post) {
    return <div>Post not found</div>
  }
  const mdxSource = await serialize(post.content)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <EditPostForm post={post} authors={authors} tags={tags} />
      <form action={handleDeletePost}>
        <input type="hidden" name="id" value={post.id} />
        <Button type="submit" variant="destructive">Delete Post</Button>
      </form>
    </div>
  )
}