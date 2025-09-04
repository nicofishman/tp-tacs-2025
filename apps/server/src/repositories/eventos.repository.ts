import { prisma } from "@/lib/prisma";
import type { Evento } from "../types";

export const EventosRepository = {
	async findAll(): Promise<Evento[]> {
		return prisma.Evento.findMany();
	},

	async findById(id: string): Promise<Evento | null> {
		return prisma.Evento.findUnique({ where: { id } });
	},

	async create(data: Omit<Evento, "id">): Promise<Evento> {
		return prisma.Evento.create({ data });
	},

	async update(id: string, data: Partial<Evento>): Promise<Evento | null> {
		try {
			return await prisma.Evento.update({ where: { id }, data });
		} catch (error) {
			console.error("Error al actualizar el evento:", error);
			return null;
		}
	},

	async delete(id: string): Promise<Evento | null> {
		try {
			return await prisma.Evento.delete({ where: { id } });
		} catch {
			return null;
		}
	},
};
