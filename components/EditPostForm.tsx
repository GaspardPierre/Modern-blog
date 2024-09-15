"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubmitButton from "@/components/SubmitButton";
import { handleUpdatePost } from "@/lib/serverActions";
import { Author, Tag, FormState, Post } from "@/app/types"
import { Check } from "lucide-react";
import { serialize } from 'next-mdx-remote/serialize';
import MDXComponents from "@/components/MDXComponents";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  { ssr: false }
);


interface EditPostFormProps {
  post: Post;
  authors: Author[];
  tags: Tag[];
}

interface EditPostFormProps {
  post: Post;
  authors: Author[];
  tags: Tag[];
}

const initialState: FormState = {
  message: "",
};

export default function EditPostForm({
  post,
  authors,
  tags,
}: EditPostFormProps) {
  const [state, formAction] = useFormState(handleUpdatePost, initialState);
  const [isPreview, setIsPreview] = useState(false);
  const [mdxSource, setMdxSource] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.message === "Post mis à jour avec succès") {
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    }
  }, [state.message, router]);

  const togglePreview = async () => {
    if (!isPreview) {
      const contentValue = (document.getElementById("content") as HTMLTextAreaElement)?.value || '';
      const mdxSource = await serialize(contentValue);
      setMdxSource(mdxSource);
    }
    setIsPreview(!isPreview);
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={post.id} />
      {state.message && (
        <Alert
          variant={state.message.includes("succès") ? "default" : "destructive"}
        >
          <AlertTitle>
            {state.message.includes("succès") ? "Succès" : "Erreur"}
          </AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Titre
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={post.title}
          placeholder="Titre du post"
          required
        />
        {state.errors?.title && (
          <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
        )}
      </div>
 
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Contenu
        </label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content}
          placeholder="Écrivez votre post ici... Utilisez ![alt text](image_url) pour ajouter des images."
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
          onClick={togglePreview}
          variant="outline"
        >
          {isPreview ? "Éditer" : "Prévisualiser"}
        </Button>
        <SubmitButton icon={<Check className="h-4 w-4" />}>Soumettre</SubmitButton>
      </div>
      {isPreview && mdxSource && (
        <div className="mt-8 prose">
          <h2>
            {(document.getElementById("title") as HTMLInputElement)?.value}
          </h2>
          {(document.getElementById("coverImage") as HTMLInputElement)
            ?.value && (
            <img
              src={
                (document.getElementById("coverImage") as HTMLInputElement)
                  ?.value
              }
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
  );
}