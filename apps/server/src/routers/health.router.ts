import type { Elysia } from "elysia";
import { HealthController } from "@/controllers/health.controller";
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
