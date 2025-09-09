import type { Categoria } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const CategoriasRepository = {
  async create(data: Omit<Categoria, "id">): Promise<Categoria> {
    return prisma.categoria.create({ data });
  },

  async delete(id: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.delete({ where: { id } });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      return null;
    }
  },

  async deleteByName(nombre: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.delete({ where: { nombre } });
    } catch (error) {
      console.error("Error al eliminar la categoría por nombre:", error);
      return null;
    }
  },

  async findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany();
  },

  async findById(id: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error al buscar la categoría por ID:", error);
      return null;
    }
  },

  async findByNombre(nombre: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.findUnique({ where: { nombre } });
    } catch (error) {
      console.error("Error al buscar la categoría por nombre:", error);
      return null;
    }
  },
};
