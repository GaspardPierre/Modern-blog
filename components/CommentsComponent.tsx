'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Comment } from '@/app/types'
import SubmitButton from '@/components/SubmitButton'

interface CommentWithUser {
  id: number;
  content: string;
  createdAt: Date | string;
  userId: string;
  postId: number;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: string;
  };
}

interface CommentsComponentProps {
  postId: number;
  initialComments: CommentWithUser[];
}
export default function Comments({ postId, initialComments }: CommentsComponentProps ) {
  const [comments, setComments] = useState<CommentWithUser[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      router.push('/login')
      return
    }
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content: newComment }),
    })
    if (response.ok) {
      const comment = await response.json()
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Commentaires</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Par {comment.user.name} le {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
      {session ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Ajoutez un commentaire..."
          />
          <SubmitButton
          >
            Publier le commentaire
          </SubmitButton>
        </form>
      ) : (
        <p className="mt-4 text-gray-600">
          <a href="/login" className="text-blue-500 hover:underline">Connectez-vous</a> pour laisser un commentaire.
        </p>
      )}
    </div>
  )
}