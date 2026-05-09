import { Hono } from "hono";
import posts from "./routes/posts";

const app = new Hono();

// Posts API — public reads, protected writes
app.route("/api/posts", posts);

// 404 handler
app.notFound((c) => c.json({ error: "Not Found" }, 404));

// Global error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: err.message || "Internal Server Error" }, 500);
});

export default app;
