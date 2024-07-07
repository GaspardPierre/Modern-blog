'use client'

import React, { useState } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from './MDXComponents'

export default function PostEditor({ initialPost, onSave }) {
  const [title, setTitle] = useState(initialPost?.title || '')
  const [content, setContent] = useState(initialPost?.content || '')

  const handleSave = async () => {
    const postData = {
      title,
      content,
      authorId: 1, // Remplacez par l'ID de l'auteur actuel
      published: true,
    }

    const response = await fetch('/api/posts' + (initialPost ? `/${initialPost.id}` : ''), {
      method: initialPost ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    if (response.ok) {
      const savedPost = await response.json()
      onSave(savedPost)
    } else {
      console.error('Failed to save post')
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post content here..."
        className="w-full p-2 border rounded h-64"
      />
      <div className="preview">
        <h2 className="text-2xl font-bold">{title}</h2>
        <MDXRemote source={content} components={MDXComponents} />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Post
      </button>
    </div>
  )
}