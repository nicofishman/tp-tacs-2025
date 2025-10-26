import { treaty } from "@elysiajs/eden";
import type { App } from "@server/types";

export const api = treaty<App>("http://localhost:3000", {
  fetch: {
    credentials: "include", // Include cookies in all requests
  },
});
