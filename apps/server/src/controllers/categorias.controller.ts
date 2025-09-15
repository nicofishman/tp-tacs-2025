import type { CreateCategoriaInput } from "@/schemas/categorias/create-categoria.schema";
import { CategoriasService } from "@/services/categorias.service";

export const CategoriasController = {
  async create(data: CreateCategoriaInput) {
    return await CategoriasService.create(data);
  },
  async delete(id: string) {
    await CategoriasService.delete(id);
  },
  async deleteByName(nombre: string) {
    await CategoriasService.deleteByName(nombre);
  },
  async findAll() {
    return await CategoriasService.findAll();
  },

  async findById(id: string) {
    return await CategoriasService.findById(id);
  },
};
