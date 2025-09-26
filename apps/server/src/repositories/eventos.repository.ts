import type { Evento, Prisma } from "@prisma/client";
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
    data: Omit<Evento, "id" | "createdAt" | "updatedAt">,
  ): Promise<EventoWithCategoriaAndOrganizador | null> {
    try {
      const prismaEvento = await prisma.evento.create({
        data: {
          categoriaId: data.categoriaId,
          cupoMaximo: data.cupoMaximo,
          cupoMinimo: data.cupoMinimo ?? null,
          descripcion: data.descripcion,
          duracion: { ...data.duracion },
          estado: data.estado,
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
      console.error("Error al crear evento:", error);
      return null;
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
      console.error("Error al eliminar evento:", error);
      return null;
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
      return [];
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
      console.error("Error al buscar evento por ID:", error);
      return null;
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
      throw new Error("Error al actualizar evento", { cause: error });
    }
  },
};
