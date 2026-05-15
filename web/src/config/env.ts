const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (!VITE_API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL in web/.env");
}

export { VITE_API_BASE_URL };
export const API_BASE_URL = VITE_API_BASE_URL;
