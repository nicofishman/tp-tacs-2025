import type { CreateUsuarioInput } from "@server/schemas/usuarios/create-usuario.schema";
import type { UpdateUsuarioInput } from "@server/schemas/usuarios/update-usuario.schema";
import { UsuariosService } from "../services/usuarios.service";

export const UsuariosController = {
  async delete(id: string) {
    await UsuariosService.delete(id);
  },

  async deleteByEmail(email: string) {
    await UsuariosService.deleteByEmail(email);
  },

  async findAll() {
    return await UsuariosService.findAll();
  },

  async findById(id: string) {
    return await UsuariosService.findById(id);
  },

  async findEventsByUserId(id: string) {
    return await UsuariosService.findEventsByUserId(id);
  },

  async register(data: CreateUsuarioInput) {
    return await UsuariosService.register(data);
  },

  async update(id: string, data: UpdateUsuarioInput) {
    return await UsuariosService.update(id, data);
  },
};
