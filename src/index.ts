import { Hono } from "hono";
import homeRoutes from "./routes/home";
import postsRoutes from "./routes/posts";

const app = new Hono();

app.route("/", homeRoutes);
app.route("/posts/", postsRoutes);

export default app;
