import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { postId, content } = await req.json()

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        user: { connect: { email: session.user.email } },
        post: { connect: { id: postId } },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du commentaire' }, { status: 500 })
  }
}