'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Edit, Eye } from 'lucide-react'

interface Post {
  id: number;
  title: string;
  createdAt: string;
  published: boolean;
}

export default function AdminPostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-60"
            />
            <Link href="/admin/posts/new">
              <Button>Create New Post</Button>
            </Link>
          </div>
          <div className="grid grid-cols-[1fr,auto,auto,auto] gap-4">
            <div className="font-medium text-gray-800">Title</div>
            <div className="text-center">Edit</div>
            <div className="text-center">View</div>
            <div className="text-center">Status</div>
            {filteredPosts.map((post) => (
              <>
                <div key={post.id} className="flex flex-col justify-center">
                  <p className="font-medium text-gray-800">{post.title}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <Button 
                    variant={post.published ? "default" : "secondary"} 
                    
                  >
                    {post.published ? "Published" : "Draft"}
                  </Button>
                </div>
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}