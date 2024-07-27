// app/admin/posts/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic';
const MDXRemote = dynamic(() => import('next-mdx-remote/rsc'));
const MDXComponents = dynamic(() => import('@/components/MDXComponents'));

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSave = async () => {
    const postData = {
      title,
      content,
      authorId: 1,
      published: true,
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    if (response.ok) {
      const savedPost = await response.json()
      console.log('New post saved:', savedPost)
      router.push('/admin/posts')
    } else {
      console.error('Failed to save post')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
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
              Save Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}