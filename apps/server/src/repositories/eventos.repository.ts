import type { Evento, Prisma } from "@prisma/client";
import { QueryError } from "@server/exceptions/QueryError";
import { prisma } from "@server/lib/prisma";

export type EventoWithCategoriaAndOrganizador = Prisma.EventoGetPayload<{
  include: { categoria: true; organizador: true };
}>;

export function mapPrismaEventoToEvento(
  prismaEvento: EventoWithCategoriaAndOrganizador,
): EventoWithCategoriaAndOrganizador {
  return {
    categoria: prismaEvento.categoria,
    categoriaId: prismaEvento.categoriaId,
    createdAt: prismaEvento.createdAt,
    cupoMaximo: prismaEvento.cupoMaximo,
    cupoMinimo: prismaEvento.cupoMinimo ?? null,
    descripcion: prismaEvento.descripcion,
    duracion: prismaEvento.duracion,
    estado: prismaEvento.estado,
    fechaInicio: prismaEvento.fechaInicio,
    id: prismaEvento.id,
    organizador: prismaEvento.organizador,
    organizadorId: prismaEvento.organizadorId,
    precio: prismaEvento.precio,
    titulo: prismaEvento.titulo,
    ubicacion: prismaEvento.ubicacion,
    updatedAt: prismaEvento.updatedAt,
  };
}

type FindManyDBFilters = {
  dateFrom?: string;
  dateTo?: string;
  categoriaId?: string;
  priceMin?: number;
  priceMax?: number;
  q?: string;
  limit?: number;
  page?: number;
  orderBy?: "fechaInicio" | "precio";
  order?: "asc" | "desc";
};

export const EventosRepository = {
  async create(
    data: Omit<Evento, "id" | "createdAt" | "updatedAt" | "estado">,
  ): Promise<EventoWithCategoriaAndOrganizador | null> {
    try {
      const prismaEvento = await prisma.evento.create({
        data: {
          categoriaId: data.categoriaId,
          cupoMaximo: data.cupoMaximo,
          cupoMinimo: data.cupoMinimo ?? null,
          descripcion: data.descripcion,
          duracion: { ...data.duracion },
          fechaInicio: data.fechaInicio,
          organizadorId: data.organizadorId,
          precio: data.precio,
          titulo: data.titulo,
          ubicacion: { ...data.ubicacion },
        },
        include: {
          categoria: true,
          organizador: true,
        },
      });
      return prismaEvento;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError("Ya existe un evento con ese título.");
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al crear el evento.",
        );
      }
      console.error("Error al crear evento:", error);
      throw new QueryError("Error al crear evento.");
    }
  },

  async delete(id: string): Promise<EventoWithCategoriaAndOrganizador | null> {
    try {
      const prismaEvento = await prisma.evento.delete({
        include: {
          categoria: true,
          organizador: true,
        },
        where: { id },
      });
      return prismaEvento;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el evento con el ID proporcionado.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar el evento porque está siendo referenciado por otros registros.",
        );
      }
      console.error("Error al eliminar evento:", error);
      throw new QueryError("Error al eliminar evento.");
    }
  },

  async findAll(
    f: FindManyDBFilters,
  ): Promise<EventoWithCategoriaAndOrganizador[]> {
    try {
      const AND: Prisma.EventoWhereInput[] = [];

      if (f.dateFrom) AND.push({ fechaInicio: { gte: new Date(f.dateFrom) } });
      if (f.dateTo) AND.push({ fechaInicio: { lte: new Date(f.dateTo) } });
      if (f.categoriaId) AND.push({ categoriaId: f.categoriaId });
      if (typeof f.priceMin === "number")
        AND.push({ precio: { gte: f.priceMin } });
      if (typeof f.priceMax === "number")
        AND.push({ precio: { lte: f.priceMax } });

      if (f.q && f.q.trim().length > 0) {
        AND.push({
          OR: [
            { titulo: { contains: f.q, mode: "insensitive" } },
            { descripcion: { contains: f.q, mode: "insensitive" } },
          ],
        });
      }

      const take = f.limit ?? 20;
      const page = f.page ?? 1;
      const skip = (page - 1) * take;

      const orderBy = f.orderBy
        ? { [f.orderBy]: f.order ?? "asc" }
        : { fechaInicio: "asc" as const };

      const rows = await prisma.evento.findMany({
        include: { categoria: true, organizador: true },
        orderBy,
        skip,
        take,
        where: AND.length ? { AND } : undefined,
      });

      return rows;
    } catch (error) {
      console.error("Error al buscar eventos con filtros:", error);
      throw new QueryError("Error al buscar eventos con filtros.");
    }
  },

  async findById(
    id: string,
  ): Promise<EventoWithCategoriaAndOrganizador | null> {
    try {
      const prismaEvento = await prisma.evento.findUnique({
        include: {
          categoria: true,
          organizador: true,
        },
        where: { id },
      });
      return prismaEvento;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró el evento con el ID proporcionado.");
        return null;
      }
      console.error("Error al buscar evento por ID:", error);
      throw new QueryError("Error al buscar evento por ID.");
    }
  },
  async findByUserId(
    userId: string,
  ): Promise<EventoWithCategoriaAndOrganizador[]> {
    return prisma.evento.findMany({
      include: { categoria: true, organizador: true },
      where: { organizadorId: userId },
    });
  },

  async update(
    id: string,
    data: Partial<EventoWithCategoriaAndOrganizador>,
  ): Promise<EventoWithCategoriaAndOrganizador | null> {
    try {
      const prismaEvento = await prisma.evento.update({
        data: {
          ...(data.titulo && { titulo: data.titulo }),
          ...(data.descripcion && { descripcion: data.descripcion }),
          ...(data.fechaInicio && { fechaInicio: data.fechaInicio }),
          ...(data.duracion && { duracion: { ...data.duracion } }),
          ...(data.ubicacion && { ubicacion: { ...data.ubicacion } }),
          ...(data.cupoMaximo && { cupoMaximo: data.cupoMaximo }),
          ...(data.cupoMinimo !== undefined && { cupoMinimo: data.cupoMinimo }),
          ...(data.precio && { precio: data.precio }),
          ...(data.estado && { estado: data.estado }),
          ...(data.categoria && { categoriaId: data.categoria.id }),
          ...(data.organizador && { organizadorId: data.organizador.id }),
        },
        include: {
          categoria: true,
          organizador: true,
        },
        where: { id },
      });
      return prismaEvento;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error(
          "No se encontró el evento con el ID proporcionado para actualizar.",
        );
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError("Ya existe un evento con ese título.");
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al actualizar el evento.",
        );
      }
      console.error("Error al actualizar evento:", error);
      throw new QueryError("Error al actualizar evento.");
    }
  },
};
