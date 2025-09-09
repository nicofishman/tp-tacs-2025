import { ConflictError } from "@/exceptions/ConflictError";
import { prisma } from "@/lib/prisma";

export const HealthController = {
  async checkHealth() {
    try {
      // Consulto a base de datos para validar que está levantada y funcional
      await prisma.$runCommandRaw({ ping: 1 });
      return { database: "connected", status2: "ok" };
    } catch (error) {
      throw new ConflictError(
        `No se pudo conectar a la base de datos: ${error}`,
      );
    }
  },
};
