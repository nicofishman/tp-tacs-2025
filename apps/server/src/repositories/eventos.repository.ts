import { prisma } from "@/lib/prisma";
import type { Evento } from "@/types";
import type { Prisma } from "@prisma/client";

export function mapPrismaEventoToEvento(
  prismaEvento: Prisma.EventoGetPayload<{
    include: { categoria: true; organizador: true };
  }>,
): Evento {
  return {
    categoria: prismaEvento.categoria,
    cupoMaximo: prismaEvento.cupoMaximo,
    cupoMinimo: prismaEvento.cupoMinimo ?? undefined,
    descripcion: prismaEvento.descripcion,
    duracion:
      typeof prismaEvento.duracion === "string"
        ? JSON.parse(prismaEvento.duracion)
        : prismaEvento.duracion,
    estado: prismaEvento.estado,
    fechaInicio:
      prismaEvento.fechaInicio instanceof Date
        ? prismaEvento.fechaInicio.toISOString()
        : prismaEvento.fechaInicio,
    id: prismaEvento.id,
    organizador: prismaEvento.organizador,
    precio: prismaEvento.precio,
    titulo: prismaEvento.titulo,
    ubicacion:
      typeof prismaEvento.ubicacion === "string"
        ? JSON.parse(prismaEvento.ubicacion)
        : prismaEvento.ubicacion,
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
  async create(data: Omit<Evento, "id">): Promise<Evento | null> {
    try {
      const prismaEvento = await prisma.evento.create({
        data: {
          categoriaId: data.categoria.id,
          cupoMaximo: data.cupoMaximo,
          cupoMinimo: data.cupoMinimo ?? null,
          descripcion: data.descripcion,
          duracion: { ...data.duracion },
          estado: data.estado,
          fechaInicio: data.fechaInicio,
          organizadorId: data.organizador.id,
          precio: data.precio,
          titulo: data.titulo,
          ubicacion: { ...data.ubicacion },
        },
        include: {
          categoria: true,
          organizador: true,
        },
      });
      return mapPrismaEventoToEvento(prismaEvento);
    } catch (error) {
      console.error("Error al crear evento:", error);
      return null;
    }
  },

  async delete(id: string): Promise<Evento | null> {
    try {
      const prismaEvento = await prisma.evento.delete({
        include: {
          categoria: true,
          organizador: true,
        },
        where: { id },
      });
      return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      return null;
    }
  },
  async findAll(): Promise<Evento[]> {
    try {
      const eventos = await prisma.evento.findMany({
        include: {
          categoria: true,
          organizador: true,
        },
      });
      return eventos.map(mapPrismaEventoToEvento);
    } catch (error) {
      console.error("Error al buscar eventos:", error);
      return [];
    }
  },

  async findById(id: string): Promise<Evento | null> {
    try {
      const prismaEvento = await prisma.evento.findUnique({
        include: {
          categoria: true,
          organizador: true,
        },
        where: { id },
      });
      return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
    } catch (error) {
      console.error("Error al buscar evento por ID:", error);
      return null;
    }
  },

  async findMany(f: FindManyDBFilters): Promise<Evento[]> {
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

      return rows.map(mapPrismaEventoToEvento);
    } catch (error) {
      console.error("Error al buscar eventos con filtros:", error);
      return [];
    }
  },

  async update(id: string, data: Partial<Evento>): Promise<Evento | null> {
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
      return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
    } catch (error) {
      console.error("Error al actualizar evento:", error);
      return null;
    }
  },
};
