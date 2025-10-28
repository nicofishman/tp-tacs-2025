import { createAuthClient } from "better-auth/react";

const apiUrl = import.meta.env.SSR
  ? process.env.API_URL
  : import.meta.env.VITE_API_URL;

export const authClient = createAuthClient({
  baseURL: apiUrl || "http://localhost:3000",
});
