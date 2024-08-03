

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: string;
    accounts: Account[];
    sessions: Session[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    user: User;
  };
  
  export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
  };
  
  export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
  };
  
  export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    age: number;
    bio: string;
    website: string | null;
    avatar: string | null;
    posts: Post[];
    videos: Video[];
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Post = {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    published: boolean;
    author: Author;
    authorId: number;
    comments: Comment[];
    tags: Tag[];
    coverImage: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Video = {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: Author;
    authorId: number;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Comment = {
    id: number;
    content: string;
    post: Post;
    postId: number;
    user: User;
    userId: string;
    createdAt: Date;
  };
  
  export type Tag = {
    id: number;
    name: string;
    slug: string;
    posts: Post[];
    videos: Video[];
    createdAt: Date;
    updatedAt: Date;
  };
  
  export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }