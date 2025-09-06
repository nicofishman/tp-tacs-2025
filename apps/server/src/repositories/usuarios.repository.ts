import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export const UsuariosRepository = {
	// Devuelve todos los usuarios o una lista vacía si no hay usuarios
	async findAll(): Promise<Usuario[]> {
		return prisma.usuario.findMany();
	},

	// Devuelve un usuario por ID o null si no existe
	async findById(id: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.findUnique({ where: { id } });
		} catch (error) {
			console.error("Error en findById:", error);
			return null;
		}
	},

	// Busca un usuario por email y devuelve el usuario o null si no existe
	async findByEmail(email: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.findUnique({ where: { email } });
		} catch (error) {
			console.error("Error en findByEmail:", error);
			return null;
		}
	},

	// Crea un nuevo usuario, lo guarda en la base de datos y lo devuelve.
	async create(data: Omit<Usuario, "id">): Promise<Usuario> {
		return prisma.usuario.create({ data });
	},

	// Actualiza un usuario existente y devuelve el usuario actualizado o null si no existe
	async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
		try {
			return await prisma.usuario.update({ where: { id }, data });
		} catch (error) {
			console.error("Error en update:", error);
			return null;
		}
	},

	// Elimina un usuario por ID y devuelve el usuario eliminado o null si no existe
	async delete(id: string): Promise<Usuario | null> {
		try {
			return await prisma.usuario.delete({ where: { id } });
		} catch (error) {
			console.error("Error en delete:", error);
			return null;
		}
	},
};
