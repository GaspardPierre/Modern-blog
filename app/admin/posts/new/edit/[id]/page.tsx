// app/admin/posts/edit/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

export default function EditPost({ params }) {
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${params.id}`)
      if (response.ok) {
        const postData = await response.json()
        setPost(postData)
        setTitle(postData.title)
        setContent(postData.content)
      } else {
        console.error('Failed to fetch post')
      }
    }

    fetchPost()
  }, [params.id])

  const handleSave = async () => {
    const postData = {
      title,
      content,
      published: true,
    }

    const response = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    if (response.ok) {
      const updatedPost = await response.json()
      console.log('Post updated:', updatedPost)
      router.push('/admin/posts')
    } else {
      console.error('Failed to update post')
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full h-64"
            />
            <div className="preview">
              <h2 className="text-2xl font-bold">{title}</h2>
              <MDXRemote source={content} components={MDXComponents} />
            </div>
            <Button onClick={handleSave} className="w-full">
              Update Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}