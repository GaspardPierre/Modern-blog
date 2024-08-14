'use server'

import { createPost } from '@/lib/posts';
import { updatePost } from '@/lib/posts';
import { FormState } from '@/types';

export async function handleCreatePost(prevState: FormState, formData: FormData): Promise<FormState> {
  console.log("HandleCreatePost called", Object.fromEntries(formData));

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const authorId = formData.get('authorId') as string;
  const coverImage = formData.get('coverImage') as string;
  const tagIds = formData.getAll('tagIds').map(id => parseInt(id as string));

  if (!title || !content || !authorId) {
    console.log("Missing required fields");
    return {
      message: 'Tous les champs sont requis',
      errors: {
        title: title ? undefined : ['Le titre est requis'],
        content: content ? undefined : ['Le contenu est requis'],
        authorId: authorId ? undefined : ["L'auteur est requis"],
      },
    };
  }

  try {
    console.log("Calling createPost");
    const result = await createPost({
      title,
      content,
      authorId: parseInt(authorId),
      published: true,
      coverImage,
      tagIds,
    });
    console.log("Post created successfully", result);
    return { message: 'Post créé avec succès' };
  } catch (error) {
    console.error("Error creating post", error);
    return { message: 'Erreur lors de la création du post' };
  }
}

export async function handleUpdatePost(prevState: FormState, formData: FormData): Promise<FormState> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const authorId = formData.get('authorId') as string;
  const content = formData.get('content') as string;
  const coverImage = formData.get('coverImage') as string;
  const tagIds = formData.getAll('tagIds').map(id => parseInt(id as string));

  if (!id || !title || !content || !authorId) {
    return {
      message: 'Tous les champs sont requis',
      errors: {
        title: title ? undefined : ['Le titre est requis'],
        content: content ? undefined : ['Le contenu est requis'],
        authorId: authorId ? undefined : ["L'auteur est requis"],
      },
    };
  }

  try {
    const result = await updatePost(parseInt(id), {
      title,
      content,
      authorId: parseInt(authorId),
      coverImage,
      tagIds,
    });
    return { message: 'Post mis à jour avec succès' };
  } catch (error) {
    console.error("Error updating post", error);
    return { message: 'Erreur lors de la mise à jour du post' };
  }
}

export async function handleDeletePost(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { message: 'ID du post manquant' };
  }

  try {
    await deletePost(parseInt(id));
    return { message: 'Post supprimé avec succès' };
  } catch (error) {
    console.error("Error deleting post", error);
    return { message: 'Erreur lors de la suppression du post' };
  }
}
