import { Hono } from "hono";
import {posts } from '../data/posts';
const postsRoutes = new Hono();

// postsRoutes.get("/", (c) => {
//   return c.json({
//     message: "Posts endpoint is working",
//     posts: [posts],
//   });
// });

postsRoutes.get('/', (c) => {
  const page = c.req.query("page")
  const qty = c.req.query('qty')
  if (!page && !qty) {
    return c.text('Params missing', 404)
  } else {
    return c.json({page, qty}, 200)
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
