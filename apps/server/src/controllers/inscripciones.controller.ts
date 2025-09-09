import type { CreateInscripcionDto } from "@/dtos/inscripciones/input/create-inscripcion.dto";
import type { UpdateInscripcionDto } from "@/dtos/inscripciones/input/update-inscripcion.dto";
import { ValidationError } from "@/exceptions/ValidationError";
import { IdSchema } from "@/schemas/eventos/evento.input.schema";
import {
  createInscripcionSchema,
  updateInscripcionSchema,
} from "@/schemas/inscripciones/inscripcion.input.schema";
import { InscripcionesService } from "@/services/inscripciones.service";

export const InscripcionesController = {
  async create(data: CreateInscripcionDto) {
    const resultData = createInscripcionSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await InscripcionesService.create(resultData.data);
  },

  async delete(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    await InscripcionesService.delete(id);
  },
  async findAll() {
    return await InscripcionesService.findAll();
  },

  async findById(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await InscripcionesService.findById(id);
  },

  async update(id: string, data: UpdateInscripcionDto) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = updateInscripcionSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await InscripcionesService.update(id, resultData.data);
  },
};
