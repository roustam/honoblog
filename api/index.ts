import { Hono } from "hono";
import { cors } from "hono/cors"

export const config = { runtime: 'nodejs' }

const app = new Hono().basePath('/api');

// CORS setup
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://honoblog.vercel.app"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "x-api-key"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 86400,
  }),
);

app.get('/hello', (c) => c.json({ message: 'Hello from Hono! iw orks' }))

export default app;
