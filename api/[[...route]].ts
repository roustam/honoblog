export const config = {
  runtime: "edge",
};

import app from "../lib/app";

export default async function handler(request: Request) {
  return app.fetch(request);
}
