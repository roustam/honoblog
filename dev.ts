import app from "./api/_lib/app";

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log(`Listening on http://localhost:${server.port}`);
