import { prisma } from "@/lib/prisma";

export const HealthController = {
	async checkHealth() {
		try {
			// Consulto a base de datos para validar que está levantada y funcional
			await prisma.$runCommandRaw({ ping: 1 });
			return { status: "ok", database: "connected" };
		} catch (error) {
			return {
				status: "error",
				database: "error",
				details: (error as Error).message,
			};
		}
	},
};
