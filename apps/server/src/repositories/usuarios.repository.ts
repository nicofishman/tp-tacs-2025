import { prisma } from "@/lib/prisma";
import type { Usuario } from "../types";

export const UsuariosRepository = {
	// Devuelve todos los usuarios o una lista vacía si no hay usuarios
	async findAll(): Promise<Usuario[]> {
		return prisma.Usuario.findMany();
	},

	// Devuelve un usuario por ID o null si no existe
	async findById(id: string): Promise<Usuario | null> {
		return prisma.Usuario.findUnique({ where: { id } });
	},

	// Crea un nuevo usuario, lo guarda en la base de datos y lo devuelve.
	async create(data: Omit<Usuario, "id">): Promise<Usuario> {
		return prisma.Usuario.create({ data });
	},

	// Actualiza un usuario existente y devuelve el usuario actualizado o null si no existe
	async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
		try {
			return await prisma.Usuario.update({ where: { id }, data });
		} catch (error) {
			console.error("Error al actualizar el usuario:", error);
			return null;
		}
	},

	// Elimina un usuario por ID y devuelve el usuario eliminado o null si no existe
	async delete(id: string): Promise<Usuario | null> {
		try {
			return await prisma.Usuario.delete({ where: { id } });
		} catch {
			return null;
		}
	},
};
