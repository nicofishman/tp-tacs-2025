import { EventosService } from "@server/services/eventos.service";
import { InscripcionesService } from "@server/services/inscripciones.service";

export const MeController = {
  async findMyEvents(userId: string) {
    return await EventosService.findByOrganizadorId(userId);
  },
  async findMyInscriptions(userId: string) {
    return await InscripcionesService.findByUserId(userId);
  },
};
