import type { Usuario } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ConflictError } from "@/exceptions/ConflictError";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { InscripcionesRepository } from "@/repositories/inscripciones.repository";
import { UsuariosRepository } from "@/repositories/usuarios.repository";
import type { CreateUsuarioInput } from "@/schemas/usuarios/create-usuario.schema";
import type { ReplaceUsuarioInput } from "@/schemas/usuarios/replace-usuario.schema";
import type { UpdateUsuarioInput } from "@/schemas/usuarios/update-usuario.schema";

// Servicio para manejar la lógica de negocio relacionada con usuarios

export const UsuariosService = {
  async delete(id: string) {
    const eliminado = await UsuariosRepository.delete(id);
    if (!eliminado) {
      throw new NotFoundError("Usuario no encontrado");
    }
  },
  async deleteByEmail(email: string) {
    const eliminado = await UsuariosRepository.deleteByEmail(email);
    if (!eliminado) {
      throw new NotFoundError("Usuario no encontrado");
    }
  },
  async findAll() {
    const usuarios = await UsuariosRepository.findAll();
    return usuarios;
  },

  async findById(id: string) {
    const usuario = await UsuariosRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return usuario;
  },

  async findEventsByUserId(id: string) {
    const usuario = await UsuariosRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError("Usuario no encontrado");
    }

    const inscripciones = await InscripcionesRepository.findByUserId(id);

    return inscripciones.map((inscripcion) => ({
      ...inscripcion,
      evento: {
        ...inscripcion.evento,
        fechaInicio: inscripcion.evento.fechaInicio.toISOString(),
      },
      fechaRegistro: inscripcion.fechaRegistro.toISOString(),
    }));
  },

  async register(data: CreateUsuarioInput) {
    // Validacion de email repetido
    const emailExistente = await UsuariosRepository.findByEmail(data.email);
    if (emailExistente) {
      throw new ConflictError("El email ya está registrado");
    }

    // Hasheo la password
    const passwordHash = await bcrypt.hash(data.password, 10);

    const usuarioParaCrear: Omit<Usuario, "id"> = {
      ...data,
      password: passwordHash,
    };

    const usuario = await UsuariosRepository.create(usuarioParaCrear);
    return usuario;
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
    // No sobrescribas la contraseña, solo actualiza los campos permitidos
    const usuarioActualizado = await UsuariosRepository.update(id, data);
    if (!usuarioActualizado) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return usuarioActualizado;
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

    const usuarioActualizado = await UsuariosRepository.update(id, data);
    if (!usuarioActualizado) {
      throw new NotFoundError("Usuario no encontrado");
    }
    return usuarioActualizado;
  },
};
