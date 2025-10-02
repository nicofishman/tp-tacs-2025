import { QueryError } from "@server/exceptions/QueryError";
import { prisma } from "@server/lib/prisma";
import type { Usuario } from "../types";

export const UsuariosRepository = {
  async create(data: Omit<Usuario, "id">): Promise<Usuario> {
    try {
      return await prisma.usuario.create({ data });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError("Ya existe un usuario con ese email.");
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al crear el usuario.",
        );
      }
      console.error("Error al crear usuario:", error);
      throw new QueryError("Error al crear usuario.");
    }
  },

  async delete(id: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.delete({ where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el usuario con el ID proporcionado.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar el usuario porque está siendo referenciado por otros registros.",
        );
      }
      console.error("Error al eliminar usuario:", error);
      throw new QueryError("Error al eliminar usuario.");
    }
  },

  async deleteByEmail(email: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.delete({ where: { email } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el usuario con el email proporcionado.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar el usuario porque está siendo referenciado por otros registros.",
        );
      }
      console.error("Error al eliminar usuario por email:", error);
      throw new QueryError("Error al eliminar usuario por email.");
    }
  },

  async findAll(): Promise<Usuario[]> {
    try {
      return await prisma.usuario.findMany();
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      throw new QueryError("Error al buscar usuarios.");
    }
  },

  async findByEmail(email: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { email } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el usuario con el email proporcionado.");
        return null;
      }
      console.error("Error al buscar usuario por email:", error);
      throw new QueryError("Error al buscar usuario por email.");
    }
  },

  async findById(id: string): Promise<Usuario | null> {
    try {
      return await prisma.usuario.findUnique({ where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el usuario con el ID proporcionado.");
        return null;
      }
      console.error("Error al buscar usuario por ID:", error);
      throw new QueryError("Error al buscar usuario por ID.");
    }
  },

  async findByIds(ids: string[]): Promise<Usuario[]> {
    try {
      return await prisma.usuario.findMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      console.error("Error al buscar usuarios por IDs:", error);
      throw new QueryError("Error al buscar usuarios por IDs.");
    }
  },

  async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
    try {
      return await prisma.usuario.update({ data, where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error(
          "No se encontró el usuario con el ID proporcionado para actualizar.",
        );
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError("Ya existe un usuario con ese email.");
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al actualizar el usuario.",
        );
      }
      console.error("Error al actualizar usuario:", error);
      throw new QueryError("Error al actualizar usuario.");
    }
  },
};
