import { HealthController } from "@server/controllers/health.controller";
import type { Elysia } from "elysia";
import { handleRoute } from "./handleRoute";

export const HealthRouter = (app: Elysia) =>
  app.group("/health", { tags: ["Health"] }, (app) =>
    app.get("/", () =>
      handleRoute(async () => {
        const result = await HealthController.checkHealth();
        return result;
      }),
    ),
  );
