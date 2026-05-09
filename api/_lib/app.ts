import { Hono } from "hono";
import posts from "./routes/posts";

const app = new Hono();

app.route("/api/posts", posts);

app.notFound((c) => c.json({ error: "Not Found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: err.message || "Internal Server Error" }, 500);
});

export default app;
