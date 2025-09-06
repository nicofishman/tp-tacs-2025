import { ConflictError } from "@/exceptions/ConflictError";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { UsuariosRepository } from "@/repositories/usuarios.repository";
import type {
	CreateUsuarioInput,
	ReplaceUsuarioInput,
	UpdateUsuarioInput,
} from "@/schemas/usuarios/usuario.input.schema";
import { mapUsuarioToOutput } from "@/schemas/usuarios/usuario.output.schema";
import type { Usuario } from "@/types";

// Servicio para manejar la lógica de negocio relacionada con usuarios

export const UsuariosService = {
	async findAll() {
		const usuarios: Usuario[] = await UsuariosRepository.findAll();
		return usuarios.map(mapUsuarioToOutput);
	},

	async findById(id: string) {
		const usuario: Usuario | null = await UsuariosRepository.findById(id);
		if (!usuario) {
			throw new NotFoundError("Usuario no encontrado");
		}
		return mapUsuarioToOutput(usuario);
	},

	async create(data: CreateUsuarioInput) {
		// Validacion de email repetido
		const emailExistente = await UsuariosRepository.findByEmail(data.email);
		if (emailExistente) {
			throw new ConflictError("El email ya está registrado");
		}
		const usuarioParaCrear: Omit<Usuario, "id"> = { ...data }; // Actualmente no hay campos adicionales que transformar
		const usuario = await UsuariosRepository.create(usuarioParaCrear);
		return mapUsuarioToOutput(usuario);
	},

	async replace(id: string, data: ReplaceUsuarioInput) {
		// Validacion de email repetido SOLO si se quiere cambiar el email
		if (data.email) {
			const emailExistente = await UsuariosRepository.findByEmail(data.email);
			// Si existe y no es el mismo usuario
			if (emailExistente && emailExistente.id !== id) {
				throw new ConflictError("El email ya está registrado");
			}
		}
		const usuarioParaActualizar: Usuario = { id, ...data }; // Actualmente no hay campos adicionales que transformar
		const usuarioActualizado = await UsuariosRepository.update(
			id,
			usuarioParaActualizar,
		);
		if (!usuarioActualizado) {
			throw new NotFoundError("Usuario no encontrado");
		}
		return mapUsuarioToOutput(usuarioActualizado);
	},

	async update(id: string, data: UpdateUsuarioInput) {
		// Validacion de datos
		if (Object.keys(data).length === 0) {
			throw new ValidationError(
				"Debes enviar al menos un campo para actualizar",
			);
		}
		// Validacion de email repetido SOLO si se quiere cambiar el email
		if (data.email) {
			const emailExistente = await UsuariosRepository.findByEmail(data.email);
			// Si existe y no es el mismo usuario
			if (emailExistente && emailExistente.id !== id) {
				throw new ConflictError("El email ya está registrado");
			}
		}

		const usuarioParaActualizar: Partial<Usuario> = { ...data }; // Actualmente no hay campos adicionales que transformar
		const usuarioActualizado = await UsuariosRepository.update(
			id,
			usuarioParaActualizar,
		);
		if (!usuarioActualizado) {
			throw new NotFoundError("Usuario no encontrado");
		}
		return mapUsuarioToOutput(usuarioActualizado);
	},

	async delete(id: string) {
		const eliminado = await UsuariosRepository.delete(id);
		if (!eliminado) {
			throw new NotFoundError("Usuario no encontrado");
		}
	},
};
