'use client'

import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SubmitButton from '@/components/SubmitButton'
import { createPost } from '@/lib/posts' // Import createPost from lib/posts

const MDXRemote = dynamic(() => import('next-mdx-remote/rsc'))
const MDXComponents = dynamic(() => import('@/components/MDXComponents'))

//types

interface Author {
  id: number
  firstName: string
  lastName: string
}

interface NewPostFormProps {
  authors: Author[]
}

interface FormState {
  message: string
  errors?: {
    title?: string[]
    content?: string[]
    authorId?: string[]
  }
}

const initialState: FormState = {
  message: '',
}

async function handleCreatePost(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const authorId = formData.get('authorId') as string

  if (!title || !content || !authorId) {
    return {
      message: 'Tous les champs sont requis',
      errors: {
        title: title ? undefined : ['Le titre est requis'],
        content: content ? undefined : ['Le contenu est requis'],
        authorId: authorId ? undefined : ["L'auteur est requis"],
      },
    }
  }

  try {
    await createPost({
      title,
      content,
      authorId: parseInt(authorId),
      published: true,
    })

    return { message: 'Post créé avec succès' }
  } catch (error) {
    return { message: 'Erreur lors de la création du post' }
  }
}

export default function NewPostForm({ authors }: NewPostFormProps) {
  const [state, formAction] = useFormState(handleCreatePost, initialState)
  const [preview, setPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (state.message === 'Post créé avec succès') {
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    }
  }, [state.message, router])

  return (
    <form action={formAction} className="space-y-4">
      {state.message && (
        <Alert variant={state.message.includes('succès') ? 'default' : 'destructive'}>
          <AlertTitle>
            {state.message.includes('succès') ? 'Succès' : 'Erreur'}
          </AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
        <Input
          id="title"
          name="title"
          placeholder="Titre du post"
          required
        />
        {state.errors?.title && (
          <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Auteur</label>
        <Select
          id="author"
          name="authorId"
          required
          options={authors.map(author => ({
            value: author.id.toString(),
            label: `${author.firstName} ${author.lastName}`
          }))}
        />
        {state.errors?.authorId && (
          <p className="text-red-500 text-sm mt-1">{state.errors.authorId[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu</label>
        <Textarea
          id="content"
          name="content"
          placeholder="Écrivez votre post ici..."
          rows={10}
          required
        />
        {state.errors?.content && (
          <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <Button
          type="button"
          onClick={() => setPreview(!preview)}
          variant="outline"
        >
          {preview ? 'Éditer' : 'Prévisualiser'}
        </Button>
        <SubmitButton />
      </div>
      {preview && (
        <div className="mt-8 prose">
          <h2>{(document.getElementById('title') as HTMLInputElement)?.value}</h2>
          <MDXRemote 
            source={(document.getElementById('content') as HTMLTextAreaElement)?.value} 
            components={MDXComponents}
            options={{
              mdxOptions: {
                development: process.env.NODE_ENV === 'development'
              }
            }}
          />
        </div>
      )}
    </form>
  )
}
