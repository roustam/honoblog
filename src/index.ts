import { Hono } from "hono";
import homeRoutes from "./routes/home";
import healthCheckRoute from "./routes/hcheck";
import postsRoutes from "./routes/posts";

const app = new Hono();

app.route("/", homeRoutes);
app.route("/hcheck", healthCheckRoute);
app.route("/posts/", postsRoutes);

export default app;
