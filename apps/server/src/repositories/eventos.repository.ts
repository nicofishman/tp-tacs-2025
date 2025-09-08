import { prisma } from "@/lib/prisma";
import type { Evento } from "@/types";
import type { Prisma } from "@prisma/client";

export function mapPrismaEventoToEvento(
	prismaEvento: Prisma.EventoGetPayload<{
		include: { categoria: true; organizador: true };
	}>,
): Evento {
	return {
		id: prismaEvento.id,
		titulo: prismaEvento.titulo,
		descripcion: prismaEvento.descripcion,
		fechaInicio:
			prismaEvento.fechaInicio instanceof Date
				? prismaEvento.fechaInicio.toISOString()
				: prismaEvento.fechaInicio,
		duracion:
			typeof prismaEvento.duracion === "string"
				? JSON.parse(prismaEvento.duracion)
				: prismaEvento.duracion,
		ubicacion:
			typeof prismaEvento.ubicacion === "string"
				? JSON.parse(prismaEvento.ubicacion)
				: prismaEvento.ubicacion,
		cupoMaximo: prismaEvento.cupoMaximo,
		cupoMinimo: prismaEvento.cupoMinimo ?? undefined,
		precio: prismaEvento.precio,
		categoria: prismaEvento.categoria,
		estado: prismaEvento.estado,
		organizador: prismaEvento.organizador,
	};
}

export const EventosRepository = {
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
				where: { id },
				include: {
					categoria: true,
					organizador: true,
				},
			});
			return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
		} catch (error) {
			console.error("Error al buscar evento por ID:", error);
			return null;
		}
	},

	async create(data: Omit<Evento, "id">): Promise<Evento | null> {
		try {
			const prismaEvento = await prisma.evento.create({
				data: {
					titulo: data.titulo,
					descripcion: data.descripcion,
					fechaInicio: data.fechaInicio,
					duracion: { ...data.duracion },
					ubicacion: { ...data.ubicacion },
					cupoMaximo: data.cupoMaximo,
					cupoMinimo: data.cupoMinimo ?? null,
					precio: data.precio,
					estado: data.estado,
					categoriaId: data.categoria.id,
					organizadorId: data.organizador.id,
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

	async update(id: string, data: Partial<Evento>): Promise<Evento | null> {
		try {
			const prismaEvento = await prisma.evento.update({
				where: { id },
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
			});
			return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
		} catch (error) {
			console.error("Error al actualizar evento:", error);
			return null;
		}
	},

	async delete(id: string): Promise<Evento | null> {
		try {
			const prismaEvento = await prisma.evento.delete({
				where: { id },
				include: {
					categoria: true,
					organizador: true,
				},
			});
			return prismaEvento ? mapPrismaEventoToEvento(prismaEvento) : null;
		} catch (error) {
			console.error("Error al eliminar evento:", error);
			return null;
		}
	},
};
