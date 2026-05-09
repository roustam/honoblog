export const config = {
  runtime: "edge",
};

import app from "../src/app";

export default function handler(request: Request) {
  return app.fetch(request);
}
