import { Hono } from "hono";
import { cors } from "hono/cors"
import homeRoutes from "./routes/home";
import healthCheckRoute from "./routes/hcheck";
import postsRoutes from "./routes/posts";

const app = new Hono().basePath('/api');

// CORS setup
app.use(
  "*",
  cors({
    origin: "http://localhost:5173", // your front end server:port
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "x-api-key"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 86400,
  }),
);

app.route("/", homeRoutes);
app.route("/hcheck", healthCheckRoute);
app.route("/posts/", postsRoutes);

export default app;
