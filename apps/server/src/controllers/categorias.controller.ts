import type { CreateCategoriaDto } from "@/dtos/categorias/input/create-categoria.dto";
import { ValidationError } from "@/exceptions/ValidationError";
import {
  CreateCategoriaSchema,
  IdSchema,
} from "@/schemas/categorias/categoria.input.schema";
import { CategoriasService } from "@/services/categorias.service";

export const CategoriasController = {
  async create(data: CreateCategoriaDto) {
    const resultData = CreateCategoriaSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await CategoriasService.create(resultData.data);
  },

  async delete(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    await CategoriasService.delete(resultId.data);
  },
  async findAll() {
    return await CategoriasService.findAll();
  },

  async findById(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await CategoriasService.findById(id);
  },
};
