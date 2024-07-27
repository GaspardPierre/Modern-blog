import { NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'


export async function POST(request: Request) {
  try {
    const data = await request.json()
    const post = await createPost(data)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    if (error instanceof Error && error.message === 'Missing required fields') {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}