import type { CreateUsuarioDto } from "../dtos/usuarios/input/create-usuario.dto";
import type { ReplaceUsuarioDto } from "../dtos/usuarios/input/replace-usuario.dto";
import type { UpdateUsuarioDto } from "../dtos/usuarios/input/update-usuario.dto";

import { UsuariosService } from "../services/usuarios.service";

export const UsuariosController = {
	async findAll() {
		return await UsuariosService.findAll();
	},

	async findById(id: string) {
		return await UsuariosService.findById(id);
	},
	async create(data: CreateUsuarioDto) {
		return await UsuariosService.create(data);
	},

	async update(id: string, data: ReplaceUsuarioDto) {
		return await UsuariosService.update(id, data);
	},

	async partialUpdate(id: string, data: UpdateUsuarioDto) {
		return await UsuariosService.partialUpdate(id, data);
	},

	async delete(id: string) {
		await UsuariosService.delete(id);
	},
};
