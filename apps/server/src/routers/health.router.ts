import type { Elysia } from "elysia";
import { HealthController } from "@/controllers/health.controller";
import { handleRoute } from "./handleRoute";

export const HealthRouter = (app: Elysia) =>
  app.group("/health", (app) =>
    app.get("/", () =>
      handleRoute(async () => {
        const result = await HealthController.checkHealth();
        console.log("Health check result:", result);
        return result;
      }),
    ),
  );
