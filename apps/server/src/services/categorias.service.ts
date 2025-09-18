import { ConflictError } from "@server/exceptions/ConflictError";
import { NotFoundError } from "@server/exceptions/NotFoundError";
import { CategoriasRepository } from "@server/repositories/categorias.repository";
import type { CreateCategoriaInput } from "@server/schemas/categorias/create-categoria.schema";

export const CategoriasService = {
  async create(data: CreateCategoriaInput) {
    const existingCategoria = await CategoriasRepository.findByNombre(
      data.nombre,
    );
    if (existingCategoria) {
      throw new ConflictError("La categoría ya existe");
    }
    return await CategoriasRepository.create(data);
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
    return categorias;
  },

  async findById(id: string) {
    const categoria = await CategoriasRepository.findById(id);
    if (!categoria) {
      throw new NotFoundError("Categoría no encontrada");
    }
    return categoria;
  },
};
