export const config = {
  runtime: "edge",
};

import app from "./_lib/app";

export default async function handler(request: Request) {
  return app.fetch(request);
}
