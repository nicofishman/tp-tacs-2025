import { HealthController } from "@/controllers/health.controller";
import type { Elysia } from "elysia";

export const HealthRouter = (app: Elysia) => {
	app.get("/health", async () => {
		return await HealthController.checkHealth();
	});
};
