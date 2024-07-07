import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: { author: true },
  })
  if (post) {
    return NextResponse.json(post)
  }
  return NextResponse.json({ error: 'Post not found' }, { status: 404 })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
    },
  })
  return NextResponse.json(updatedPost)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.post.delete({
    where: { id: parseInt(params.id) },
  })
  return NextResponse.json({ message: 'Post deleted successfully' })
}