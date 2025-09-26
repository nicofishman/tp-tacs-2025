import { HealthController } from "@server/controllers/health.controller";
import type { ElysiaWithLogger } from "@server/types";

export const HealthRouter = (app: ElysiaWithLogger) =>
  app.group("/health", { tags: ["Health"] }, (app) =>
    app.get(
      "/",
      async () => {
        const result = await HealthController.checkHealth();
        return result;
      },
      {
        auth: true,
      },
    ),
  );
