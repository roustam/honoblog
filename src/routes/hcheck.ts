import { Hono } from "hono";
import { db } from "../db/client";

const healthCheckRoute = new Hono();

healthCheckRoute.get("/", async (c) => {
  const startedAt = Date.now();

  try {
    await db`SELECT 1`;

    return c.json(
      {
        status: "ok",
        db: "up",
        timestamp: new Date().toISOString(),
        responseMs: Date.now() - startedAt,
      },
      200,
    );
  } catch {
    return c.json(
      {
        status: "degraded",
        db: "down",
        timestamp: new Date().toISOString(),
        responseMs: Date.now() - startedAt,
      },
      503,
    );
  }
});

export default healthCheckRoute;
