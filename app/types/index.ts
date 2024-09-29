

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
    posts?: Post[];
    videos?: Video[];
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
    authorId: number;
    coverImage: string | null;
    createdAt: Date;
    updatedAt: Date;
    author?: Author; 
    comments?: Comment[]; 
    tags?: Tag[]; 
  };
  
  
  export type Video = {
    id: number;
    title: string;
    slug: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author?: Author;  
    tags?: Tag[];  
  };
  
  export type SimplifiedUser = {
    id: string;
    name: string | null;
  };
  
  export type Comment = {
    id: number;
    content: string;
    createdAt: Date;
    userId: string;
    postId: number;
    user: User;
    post: Post;
  };
  
  
  export type Tag = {
    id: number;
    name: string;
    slug: string;
    posts: Post[];
    videos: Video[];
    createdAt: Date;
    updatedAt: Date;
    count?: number;
  };
  
  export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
export type PrismaTag = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};
  export interface FormState {
    message: string;
    errors?: {
      title?: string[];
      content?: string[];
      authorId?: string[];
      coverImage?: string[];
    };
  }


export interface ArticleCardProps {
  post: {
    id: string | number;
    slug: string;
    title: string;
    excerpt: string | null;
    coverImage: string | null;
    author: {
      name: string;
    };
    createdAt: string | Date;
  };
}