import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { EventosRepository } from "@/repositories/eventos.repository";
import {
  InscripcionesRepository,
  type InscripcionWithEventoAndUsuario,
} from "@/repositories/inscripciones.repository";
import { UsuariosRepository } from "@/repositories/usuarios.repository";
import type {
  CreateInscripcionDto,
  UpdateInscripcionDto,
} from "@/schemas/inscripciones/inscripcion.input.schema";

export const InscripcionesService = {
  async create(data: CreateInscripcionDto) {
    const usuario = await UsuariosRepository.findById(data.usuarioId);
    if (!usuario) {
      throw new NotFoundError("Usuario no encontrado");
    }
    const evento = await EventosRepository.findById(data.eventoId);
    if (!evento) {
      throw new NotFoundError("Evento no encontrado");
    }

    const inscripcionParaCrear: Omit<InscripcionWithEventoAndUsuario, "id"> = {
      estado: data.estado,
      evento,
      eventoId: evento.id,
      fechaRegistro: new Date(data.fechaRegistro),
      usuario,
      usuarioId: usuario.id,
    };

    const inscripcion =
      await InscripcionesRepository.create(inscripcionParaCrear);
    return inscripcion;
  },

  async delete(id: string) {
    const deleted = await InscripcionesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Inscripción no encontrada");
    }
  },
  async findAll() {
    const inscripciones = await InscripcionesRepository.findAll();
    return inscripciones;
  },

  async findById(id: string) {
    const inscripcion = await InscripcionesRepository.findById(id);
    if (!inscripcion) {
      throw new NotFoundError("Inscripción no encontrada");
    }
    return inscripcion;
  },

  async update(id: string, data: UpdateInscripcionDto) {
    if (!data.estado || Object.keys(data).length !== 1) {
      throw new ValidationError(
        "Solo se puede modificar el estado de la inscripción",
      );
    }

    const inscripcionExistente = await InscripcionesRepository.findById(id);
    if (!inscripcionExistente) {
      throw new NotFoundError("Inscripción no encontrada");
    }

    const inscripcionParaActualizar: InscripcionWithEventoAndUsuario = {
      ...inscripcionExistente,
      estado: data.estado,
    };
    const inscripcion = await InscripcionesRepository.update(
      id,
      inscripcionParaActualizar,
    );
    return inscripcion;
  },
};
