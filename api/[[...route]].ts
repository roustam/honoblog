export const config = {
  runtime: "edge",
};

import app from "../src/app";

export default async function handler(request: Request) {
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);
  return app.fetch(request);
}
