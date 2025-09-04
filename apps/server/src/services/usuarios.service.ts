import type { CreateUsuarioDto } from "@/dtos/usuarios/input/create-usuario.dto";
import type { ReplaceUsuarioDto } from "@/dtos/usuarios/input/replace-usuario.dto";
import type { UpdateUsuarioDto } from "@/dtos/usuarios/input/update-usuario.dto";

import { UsuariosRepository } from "@/repositories/usuarios.repository";

import type { Usuario } from "@/types";
import { RolUsuario } from "@/types";

// Servicio para manejar la lógica de negocio relacionada con usuarios

export const UsuariosService = {
	async findAll() {
		const usuarios: Usuario[] = await UsuariosRepository.findAll();
		return usuarios;
	},

	async findById(id: string) {
		const usuario: Usuario | null = await UsuariosRepository.findById(id);
		if (!usuario) {
			throw new Error("Usuario no encontrado");
		}
		return usuario;
	},

	async create(data: CreateUsuarioDto) {
		// Validacion de datos
		// Deberia pasarse a una funcion de validacion
		if (!data.nombre || !data.email || !data.rol) {
			throw new Error("Datos enviados incompletos");
		}
		// Validación de rol
		if (!Object.values(RolUsuario).includes(data.rol)) {
			throw new Error("Rol de usuario inválido");
		}

		const usuarioParaRepo = {
			...data,
		};
		return await UsuariosRepository.create(usuarioParaRepo);
	},

	async update(id: string, data: ReplaceUsuarioDto) {
		// Validacion de datos
		if (!data.nombre || !data.email || !data.rol) {
			throw new Error("Datos enviados incompletos");
		}
		// Validación de rol
		if (!Object.values(RolUsuario).includes(data.rol)) {
			throw new Error("Rol de usuario inválido");
		}

		const usuarioActualizado = await UsuariosRepository.update(id, data);
		if (!usuarioActualizado) {
			throw new Error("Usuario no encontrado");
		}
		return usuarioActualizado;
	},

	async partialUpdate(id: string, data: UpdateUsuarioDto) {
		// Validacion de datos
		if (Object.keys(data).length === 0) {
			throw new Error("No se proporcionaron datos para actualizar");
		}
		// Validación de rol si corresponde
		if (data.rol && !Object.values(RolUsuario).includes(data.rol)) {
			throw new Error("Rol de usuario inválido");
		}

		const usuarioActualizado = await UsuariosRepository.update(id, data);
		if (!usuarioActualizado) {
			throw new Error("Usuario no encontrado");
		}
		return usuarioActualizado;
	},

	async delete(id: string) {
		const usuarioEliminado = await UsuariosRepository.delete(id);
		if (!usuarioEliminado) {
			throw new Error("Usuario not found");
		}
		return usuarioEliminado;
	},
};
