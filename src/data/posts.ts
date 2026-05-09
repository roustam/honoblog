import type { Post, CreatePostInput, UpdatePostInput } from "../types";

const posts: Map<string, Post> = new Map();

// Seed with sample data
const seedPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Bun",
    content: "Bun is a fast all-in-one JavaScript runtime...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Why I Chose Hono",
    content: "Hono is a lightweight web framework...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

for (const post of seedPosts) {
  posts.set(post.id, post);
}

export function getAllPosts(): Post[] {
  return Array.from(posts.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostById(id: string): Post | undefined {
  return posts.get(id);
}

export function createPost(input: CreatePostInput): Post {
  const now = new Date().toISOString();
  const post: Post = {
    id: crypto.randomUUID(),
    title: input.title,
    content: input.content,
    createdAt: now,
    updatedAt: now,
  };
  posts.set(post.id, post);
  return post;
}

export function updatePost(id: string, input: UpdatePostInput): Post | undefined {
  const post = posts.get(id);
  if (!post) return undefined;

  const updated: Post = {
    ...post,
    ...input,
    id: post.id,
    updatedAt: new Date().toISOString(),
  };
  posts.set(id, updated);
  return updated;
}

export function deletePost(id: string): boolean {
  return posts.delete(id);
}
