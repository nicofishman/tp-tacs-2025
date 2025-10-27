import { RolUsuario } from "@prisma/client";
import { EstadisticasController } from "@server/controllers/estadisticas.controller";
import { getEstadisticasSchema } from "@server/schemas/estadisticas/get-estadisticas.schema";
import type { ElysiaWithLogger } from "@server/types";

const RUTA_ESTADISTICAS = "/estadisticas";

export const EstadisticasRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_ESTADISTICAS, { tags: ["Estadisticas"] }, (app) =>
    app.get(
      "/",
      async ({ status }) => {
        const estadisticas = await EstadisticasController.getEstadisticas();
        return status(200, estadisticas);
      },
      {
        response: {
          200: getEstadisticasSchema,
        },
        role: RolUsuario.ORGANIZADOR,
      },
    ),
  );
