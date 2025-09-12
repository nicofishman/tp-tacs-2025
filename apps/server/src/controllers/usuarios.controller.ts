import { ValidationError } from "@/exceptions/ValidationError";
import {
  type CreateUsuarioInput,
  createUsuarioInputSchema,
} from "@/schemas/usuarios/create-usuario.schema";
import {
  type ReplaceUsuarioInput,
  replaceUsuarioInputSchema,
} from "@/schemas/usuarios/replace-usuario.schema";
import {
  type UpdateUsuarioInput,
  updateUsuarioInputSchema,
} from "@/schemas/usuarios/update-usuario.schema";
import { idSchema } from "@/schemas/usuarios/usuario.schema";
import { UsuariosService } from "../services/usuarios.service";

export const UsuariosController = {
  async delete(id: string) {
    const resultId = idSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    await UsuariosService.delete(id);
  },

  async deleteByEmail(email: string) {
    await UsuariosService.deleteByEmail(email);
  },

  async findAll() {
    return await UsuariosService.findAll();
  },

  async findById(id: string) {
    const resultId = idSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.findById(id);
  },

  async findEventsByUserId(id: string) {
    const resultId = idSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.findEventsByUserId(id);
  },

  async register(data: CreateUsuarioInput) {
    const resultData = createUsuarioInputSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.register(resultData.data);
  },

  async replace(id: string, data: ReplaceUsuarioInput) {
    const resultId = idSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = replaceUsuarioInputSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.replace(id, resultData.data);
  },

  async update(id: string, data: UpdateUsuarioInput) {
    const resultId = idSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = updateUsuarioInputSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.update(id, resultData.data);
  },
};
