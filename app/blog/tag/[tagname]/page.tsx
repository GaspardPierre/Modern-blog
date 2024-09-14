import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostsByTag } from "@/lib/posts";
import MDXComponents from "@/components/MDXComponents";
import { notFound } from "next/navigation";

interface Params {
  params: {
    tagname: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const { posts, tag } = await getPostsByTag(params.tagname);
  if (!tag) return { title: "Tag Not Found" };
  return { title: `Posts tagged with "${tag.name}" - Blog` };
}

export default async function TagPage({ params }: Params) {
  console.log('Rendering tag page for:', params.tagname);
  const { posts, tag } = await getPostsByTag(params.tagname);

  console.log('Tag:', tag?.name);
  console.log('Number of posts:', posts.length);
  if (!tag) notFound();

  return (
    <div className="md:w-3/4">
      <h1 className="text-4xl font-bold mb-4">
        Posts tagged with "{tag.name}"
      </h1>
      <p className="text-gray-600 mb-6">
        Explore our content related to {tag.name}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <article key={post.id} className={index === 0 ? "md:col-span-2" : ""}>
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={post.coverImage || "/placeholder.jpg"}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            </Link>
            <div className="prose prose-sm max-w-none mb-2">
              {post.excerpt && (
                <MDXRemote
                  source={post.excerpt}
                  components={MDXComponents}
                  options={{
                    mdxOptions: {
                      development: process.env.NODE_ENV === "development",
                    },
                  }}
                />
              )}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
