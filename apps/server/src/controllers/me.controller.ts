import { InscripcionesService } from "@server/services/inscripciones.service";

export const MeController = {
  async findMyInscriptions(userId: string) {
    return await InscripcionesService.findByUserId(userId);
  },
};
