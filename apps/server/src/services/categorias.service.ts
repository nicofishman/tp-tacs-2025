import { ConflictError } from "@/exceptions/ConflictError";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { CategoriasRepository } from "@/repositories/categorias.repository";
import type { CreateCategoriaDto } from "@/schemas/categorias/categoria.input.schema";
import { mapCategoriaToOutput } from "@/schemas/categorias/categoria.output.schema";

export const CategoriasService = {
  async create(data: CreateCategoriaDto) {
    const existingCategoria = await CategoriasRepository.findByNombre(
      data.nombre,
    );
    if (existingCategoria) {
      throw new ConflictError("La categoría ya existe");
    }
    const categoria = await CategoriasRepository.create(data);
    return mapCategoriaToOutput(categoria);
  },

  async delete(id: string) {
    const deleted = await CategoriasRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Categoría no encontrada");
    }
  },
  async deleteByName(nombre: string) {
    const deleted = await CategoriasRepository.deleteByName(nombre);
    if (!deleted) {
      throw new NotFoundError("Categoría no encontrada");
    }
  },
  async findAll() {
    const categorias = await CategoriasRepository.findAll();
    return categorias.map(mapCategoriaToOutput);
  },

  async findById(id: string) {
    const categoria = await CategoriasRepository.findById(id);
    if (!categoria) {
      throw new NotFoundError("Categoría no encontrada");
    }
    return mapCategoriaToOutput(categoria);
  },
};
