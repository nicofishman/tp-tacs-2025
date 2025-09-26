import type { Usuario } from "@prisma/client";
import { ConflictError } from "@server/exceptions/ConflictError";
import { NotFoundError } from "@server/exceptions/NotFoundError";
import { ValidationError } from "@server/exceptions/ValidationError";
import { EventosRepository } from "@server/repositories/eventos.repository";
import { InscripcionesRepository } from "@server/repositories/inscripciones.repository";
import { UsuariosRepository } from "@server/repositories/usuarios.repository";
import type { CreateUsuarioInput } from "@server/schemas/usuarios/create-usuario.schema";
import type { UpdateUsuarioInput } from "@server/schemas/usuarios/update-usuario.schema";
import bcrypt from "bcryptjs";

// Servicio para manejar la lógica de negocio relacionada con usuarios

export const UsuariosService = {
  async delete(id: string) {
    const eventos = await EventosRepository.findByUserId(id);
    if (eventos.length > 0) {
      throw new ConflictError("Usuario tiene eventos asociados");
    }

    const eliminado = await UsuariosRepository.delete(id);
    console.log("eliminado", eliminado);

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
