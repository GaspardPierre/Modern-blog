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
import { handleCreatePost } from '@/lib/serverActions'
import { Author, Tag, FormState } from '@/app/types'
import { serialize } from 'next-mdx-remote/serialize';
import MDXComponents from './MDXComponents'
import { Check } from 'lucide-react'

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), {
  ssr: false,
})


interface NewPostFormProps {
  authors: Author[]
  tags: Tag[]
}

const initialState: FormState = {
  message: '',
}

export default function NewPostForm({ authors, tags }: NewPostFormProps) {
  const [state, formAction] = useFormState(handleCreatePost, initialState)
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const [mdxSource, setMdxSource] = useState<any>(null)
  useEffect(() => {
    if (state.message === 'Post créé avec succès') {
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    }
  }, [state.message, router])

  const handlePreviewToggle = async () => {
    if (!preview) {
      const content = (document.getElementById('content') as HTMLTextAreaElement)?.value || ''
      const serializedContent = await serialize(content)
      setMdxSource(serializedContent)
    }
    setPreview(!preview)
  }

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
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Image de couverture (URL)</label>
        <Input
          id="coverImage"
          name="coverImage"
          type="url"
          placeholder="https://example.com/image.jpg"
        />
        {state.errors?.coverImage && (
          <p className="text-red-500 text-sm mt-1">{state.errors.coverImage[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu</label>
        <Textarea
          id="content"
          name="content"
          placeholder="Écrivez votre post ici... Utilisez ![alt text](image_url) pour ajouter des images."
          rows={10}
          required
        />
        {state.errors?.content && (
          <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <Select
          id="tags"
          name="tagIds"
          multiple
          required
          options={tags.map(tag => ({
            value: tag.id.toString(),
            label: tag.name
          }))}
        />
      </div>
      <div className="flex justify-between items-center">
        <Button
          type="button"
          onClick={handlePreviewToggle}
          variant="outline"
        >
          {preview ? 'Éditer' : 'Prévisualiser'}
        </Button>
        <SubmitButton icon={<Check className="h-4 w-4" />}>
          Créer le post
        </SubmitButton>
      </div>
      {preview && mdxSource && (
        <div className="mt-8 prose">
          <h2>{(document.getElementById('title') as HTMLInputElement)?.value}</h2>
          {(document.getElementById('coverImage') as HTMLInputElement)?.value && (
            <img 
              src={(document.getElementById('coverImage') as HTMLInputElement)?.value} 
              alt="Cover" 
              className="w-full h-48 object-cover mb-4 rounded" 
            />
          )}
          <MDXRemote 
            {...mdxSource}
            components={MDXComponents}
          />
        </div>
      )}
    </form>
  )
}
     