import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL ?? process.env.DB_CONNECTION;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL (or DB_CONNECTION) environment variable");
}

export const db = neon(connectionString);
