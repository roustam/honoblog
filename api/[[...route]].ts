export const runtime = "edge";

import app from "../src/app";

export default async function handler(request: Request) {
  return app.fetch(request);
}
