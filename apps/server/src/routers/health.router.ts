import { HealthController } from "@server/controllers/health.controller";
import type { Elysia } from "elysia";

export const HealthRouter = (app: Elysia) =>
  app.group("/health", { tags: ["Health"] }, (app) =>
    app.get("/", async () => {
      const result = await HealthController.checkHealth();
      return result;
    }),
  );
