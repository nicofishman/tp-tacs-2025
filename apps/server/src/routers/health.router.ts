import { HealthController } from "@/controllers/health.controller";
import type { Elysia } from "elysia";
import { handleRoute } from "./handleRoute";

export const HealthRouter = (app: Elysia) => {
	app.get("/health", async () =>
		handleRoute(async () => {
			return await HealthController.checkHealth();
		}),
	);
};
