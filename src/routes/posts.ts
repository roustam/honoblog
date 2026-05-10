import { Hono } from "hono";
import { posts } from '../data/posts';
import { Paginate } from "../services/posts";
const postsRoutes = new Hono();

// postsRoutes.get("/", (c) => {
//   return c.json({
//     message: "Posts endpoint is working",
//     posts: [posts],
//   });
// });

postsRoutes.get('/', (c) => {
  const page = c.req.query("page")
  const pageSize = c.req.query('pageSize')
  if (!page && !pageSize) {
    return c.text('Params missing', 404)
  } else {
    const paginatedPosts = Paginate(Number(page), Number(pageSize), posts)
    return c.json({paginatedPosts}, 200)
  }
})


postsRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = posts.find((post) => post.id === id)

  if (!post) {
    return c.json({message: "Post not found"}, 404)
  }

  return c.json({
    post,
  });
});


postsRoutes.post("/", async (c) => {
  const body = await c.req.json();

  return c.json(
    {
      message: "Post created",
      body,
    },
    201,
  );
});


export default postsRoutes;
