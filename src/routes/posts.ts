import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../data/posts";
import type { CreatePostInput, UpdatePostInput } from "../types";

const app = new Hono();

// Public: List all posts
app.get("/", (c) => {
  return c.json({ posts: getAllPosts() });
});

// Public: Get single post
app.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = getPostById(id);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({ post });
});

// Protected: Create post
app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json<CreatePostInput>();

  if (!body.title || !body.content) {
    return c.json({ error: "Title and content are required" }, 400);
  }

  const post = createPost(body);
  return c.json({ post }, 201);
});

// Protected: Update post
app.put("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<UpdatePostInput>();

  const post = updatePost(id, body);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({ post });
});

// Protected: Delete post
app.delete("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const deleted = deletePost(id);

  if (!deleted) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json({ success: true });
});

export default app;
