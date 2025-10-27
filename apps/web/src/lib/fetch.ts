import { treaty } from "@elysiajs/eden";
import type { App } from "@server/types";

const apiUrl = import.meta.env.SSR
  ? process.env.API_URL
  : import.meta.env.VITE_API_URL;

export const api = treaty<App>(apiUrl || "http://localhost:3000", {
  fetch: {
    credentials: "include",
  },
});
