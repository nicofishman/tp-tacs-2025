import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export const UsuariosRepository = {
  async create(data: Omit<Usuario, "id">): Promise<Usuario> {
    return prisma.usuario.create({ data });
  },

  async delete(id: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.delete({ where: { id } });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return null;
    }
  },
  async findAll(): Promise<Usuario[]> {
    return prisma.usuario.findMany();
  },

  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { email } });
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      return null;
    }
  },

  async findById(id: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      return null;
    }
  },

  async findByIds(ids: string[]): Promise<Usuario[]> {
    try {
      return await prisma.usuario.findMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      console.error("Error al buscar usuarios por IDs:", error);
      return [];
    }
  },

  async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
    try {
      return await prisma.usuario.update({ data, where: { id } });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return null;
    }
  },
};
