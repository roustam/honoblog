import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const API_TOKEN = process.env.API_TOKEN || "change-me-in-production";

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    throw new HTTPException(401, { message: "Missing Authorization header" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new HTTPException(401, { message: "Invalid Authorization format. Use: Bearer <token>" });
  }

  if (token !== API_TOKEN) {
    throw new HTTPException(401, { message: "Invalid token" });
  }

  await next();
});
