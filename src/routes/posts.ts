import { Hono } from "hono";
import { apiKeyAuth } from "../middleware/posts";
import { CreatePost, getPaginatedPosts, getPostBySlug, slugExists,  } from "../services/posts";
import type { Post, CreatePostInput } from "../types/post";
const postsRoutes = new Hono();

// postsRoutes.get("/", (c) => {
//   return c.json({
//     message: "Posts endpoint is working",
//     posts: [posts],
//   });
// });

postsRoutes.get('/', async (c) => {
  const page = c.req.query("page")
  const pageSize = c.req.query('pageSize')
  if (!page && !pageSize) {
    return c.text('Params missing', 404)
  } else {
    const parsedPage = Number(page)
    const parsedPageSize = Number(pageSize)

    if (Number.isNaN(parsedPage) || Number.isNaN(parsedPageSize)) {
      return c.json({ message: "page and pageSize must be valid numbers" }, 400)
    }

    try {
      const paginatedPosts = await getPaginatedPosts(parsedPage, parsedPageSize)
      return c.json({paginatedPosts}, 200)
    } catch (error) {
      console.error("Failed to fetch posts", error)
      return c.json({ message: "Failed to fetch posts from database" }, 500)
    }
  }
})


postsRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const post = await getPostBySlug(slug)

  if (!post) {
    return c.json({message: "Post not found"}, 404)
  }

  return c.json({
    post,
  });
});


postsRoutes.post("/", apiKeyAuth, async (c) => {
  const body = await c.req.json<CreatePostInput>();

  if (!body.slug || typeof body.slug !== "string") {
    return c.json({ message: "slug is required" }, 400);
  }

  try {
    const res = CreatePost(body)
  } catch (error) {
    console.error("Failed to validate slug", error)
    return c.json({ message: "Failed to validate slug against database" }, 500)
  }

  return c.json(
    {
        message: "Post created",
        body,
    },
    201,
  );
});


export default postsRoutes;
