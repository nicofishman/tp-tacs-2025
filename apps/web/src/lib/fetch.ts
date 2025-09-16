import { edenFetch } from "@elysiajs/eden";
import type { App } from "@server/types";

export const fetch = edenFetch<App>("http://localhost:3000");
