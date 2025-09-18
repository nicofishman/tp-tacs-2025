import { edenFetch } from "@elysiajs/eden";
import type { App } from "@server/types";

export const fetchClient = edenFetch<App>("http://localhost:3000");

const { data, error } = await fetchClient("/eventos", {
  query: {},
});
