import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export const UsuariosRepository = {
	async findAll(): Promise<Usuario[]> {
		return prisma.usuario.findMany();
	},

	async findById(id: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.findUnique({ where: { id } });
		} catch (error) {
			console.error("Error al buscar usuario por ID:", error);
			return null;
		}
	},

	async findByEmail(email: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.findUnique({ where: { email } });
		} catch (error) {
			console.error("Error al buscar usuario por email:", error);
			return null;
		}
	},

	async create(data: Omit<Usuario, "id">): Promise<Usuario> {
		return prisma.usuario.create({ data });
	},

	async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
		try {
			return await prisma.usuario.update({ where: { id }, data });
		} catch (error) {
			console.error("Error al actualizar usuario:", error);
			return null;
		}
	},

	async delete(id: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.delete({ where: { id } });
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
			return null;
		}
	},
};
