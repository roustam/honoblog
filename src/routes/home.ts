import { Hono } from "hono";

const homeRoutes = new Hono();

const welcomeMessage = `Hello Hono from Bun ${process.versions.bun}!`;

homeRoutes.get("/", (c) => c.text(welcomeMessage));
homeRoutes.get("/all", (c) => c.text('all post go here . line 8'))

export default homeRoutes;
