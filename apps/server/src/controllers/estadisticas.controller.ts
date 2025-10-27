import { EstadisticasService } from "@server/services/estadisticas.service";

export const EstadisticasController = {
  async getEstadisticas() {
    return await EstadisticasService.getEstadisticas();
  },
};
