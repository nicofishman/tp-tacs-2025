import { ValidationError } from "@/exceptions/ValidationError";
import { IdSchema } from "@/schemas/eventos/evento.input.schema";
import {
  type CreateInscripcionDto,
  CreateInscripcionSchema,
  type UpdateInscripcionDto,
  UpdateInscripcionSchema,
} from "@/schemas/inscripciones/inscripcion.input.schema";
import { InscripcionesService } from "@/services/inscripciones.service";

export const InscripcionesController = {
  async create(data: CreateInscripcionDto) {
    const resultData = CreateInscripcionSchema.safeParse(data);
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
    const resultData = UpdateInscripcionSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await InscripcionesService.update(id, resultData.data);
  },
};
