import type { Categoria } from "@prisma/client";
import { QueryError } from "@server/exceptions/QueryError";
import { prisma } from "@server/lib/prisma";

export const CategoriasRepository = {
  async create(data: Omit<Categoria, "id">): Promise<Categoria> {
    try {
      return await prisma.categoria.create({ data });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError("Ya existe una categoría con ese nombre.");
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al crear la categoría.",
        );
      }
      console.error("Error al crear la categoría:", error);
      throw new QueryError("Error al crear la categoría.");
    }
  },

  async delete(id: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.delete({ where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la categoría con el ID proporcionado.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar la categoría porque está siendo referenciada por otros registros.",
        );
      }
      console.error("Error al eliminar la categoría:", error);
      throw new QueryError("Error al eliminar la categoría.");
    }
  },

  async deleteByName(nombre: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.delete({ where: { nombre } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error(
          "No se encontró la categoría con el nombre proporcionado.",
        );
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar la categoría porque está siendo referenciada por otros registros.",
        );
      }
      console.error("Error al eliminar la categoría por nombre:", error);
      throw new QueryError("Error al eliminar la categoría por nombre.");
    }
  },

  async findAll(): Promise<Categoria[]> {
    try {
      return await prisma.categoria.findMany();
    } catch (error) {
      console.error("Error al buscar todas las categorías:", error);
      throw new QueryError("Error al buscar todas las categorías.");
    }
  },

  async findById(id: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.findUnique({ where: { id } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la categoría con el ID proporcionado.");
        return null;
      }
      console.error("Error al buscar la categoría por ID:", error);
      throw new QueryError("Error al buscar la categoría por ID.");
    }
  },

  async findByNombre(nombre: string): Promise<Categoria | null> {
    try {
      return await prisma.categoria.findUnique({ where: { nombre } });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error(
          "No se encontró la categoría con el nombre proporcionado.",
        );
        return null;
      }
      console.error("Error al buscar la categoría por nombre:", error);
      throw new QueryError("Error al buscar la categoría por nombre.");
    }
  },
};
