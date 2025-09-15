import type { CreateInscripcionInput } from "@/schemas/inscripciones/create-inscripcion.schema";
import type { updateInscripcionInput } from "@/schemas/inscripciones/update-inscripcion.schema";
import { InscripcionesService } from "@/services/inscripciones.service";

export const InscripcionesController = {
  async create(data: CreateInscripcionInput) {
    return await InscripcionesService.create(data);
  },

  async delete(id: string) {
    await InscripcionesService.delete(id);
  },
  async findAll() {
    return await InscripcionesService.findAll();
  },

  async findById(id: string) {
    return await InscripcionesService.findById(id);
  },

  async update(id: string, data: updateInscripcionInput) {
    return await InscripcionesService.update(id, data);
  },
};
