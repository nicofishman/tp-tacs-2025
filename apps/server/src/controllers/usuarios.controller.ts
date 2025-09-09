import { ValidationError } from "@/exceptions/ValidationError";
import {
  type CreateUsuarioDto,
  CreateUsuarioSchema,
  IdSchema,
  type RegisterUsuarioDto,
  RegisterUsuarioSchema,
  type ReplaceUsuarioDto,
  ReplaceUsuarioSchema,
  type UpdateUsuarioDto,
  UpdateUsuarioSchema,
} from "@/schemas/usuarios/usuario.input.schema";
import { UsuariosService } from "../services/usuarios.service";

export const UsuariosController = {
  async create(data: CreateUsuarioDto) {
    const resultData = CreateUsuarioSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.create(resultData.data);
  },

  async delete(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    await UsuariosService.delete(id);
  },
  async findAll() {
    return await UsuariosService.findAll();
  },

  async findById(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.findById(id);
  },

  async findEventsByUserId(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.findEventsByUserId(id);
  },

  async register(data: RegisterUsuarioDto) {
    const resultData = RegisterUsuarioSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.register(resultData.data);
  },

  async replace(id: string, data: ReplaceUsuarioDto) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = ReplaceUsuarioSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.replace(id, resultData.data);
  },

  async update(id: string, data: UpdateUsuarioDto) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = UpdateUsuarioSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err: { message: string }) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await UsuariosService.update(id, resultData.data);
  },
};
