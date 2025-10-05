import { NotFoundError } from "@server/exceptions/NotFoundError";
import { ValidationError } from "@server/exceptions/ValidationError";
import {
  InscripcionesRepository,
  type InscripcionWithEventoAndUsuario,
} from "@server/repositories/inscripciones.repository";
import type { updateInscripcionInput } from "@server/schemas/inscripciones/update-inscripcion.schema";

export const InscripcionesService = {
  // async create(data: CreateInscripcionInput) {
  //   const usuario = await UsuariosRepository.findById(data.usuarioId);
  //   if (!usuario) {
  //     throw new NotFoundError("Usuario no encontrado");
  //   }
  //   const evento = await EventosRepository.findById(data.eventoId);
  //   if (!evento) {
  //     throw new NotFoundError("Evento no encontrado");
  //   }

  //   const inscripcionParaCrear: Omit<InscripcionWithEventoAndUsuario, "id"> = {
  //     estado: data.estado,
  //     evento,
  //     eventoId: evento.id,
  //     fechaRegistro: new Date(data.fechaRegistro),
  //     usuario,
  //     usuarioId: usuario.id,
  //   };

  //   const inscripcion =
  //     await InscripcionesRepository.create(inscripcionParaCrear);
  //   return inscripcion;
  // },

  async delete(id: string) {
    const deleted = await InscripcionesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Inscripción no encontrada");
    }
  },
  async findAll() {
    const inscripciones = await InscripcionesRepository.findAll();
    return inscripciones.map((inscripcion) => ({
      ...inscripcion,
      evento: {
        ...inscripcion.evento,
        fechaInicio: inscripcion.evento.fechaInicio.toISOString(),
      },
      fechaRegistro: inscripcion.fechaRegistro.toISOString(),
    }));
  },

  async findById(id: string) {
    const inscripcion = await InscripcionesRepository.findById(id);
    if (!inscripcion) {
      throw new NotFoundError("Inscripción no encontrada");
    }
    return {
      ...inscripcion,
      evento: {
        ...inscripcion.evento,
        fechaInicio: inscripcion.evento.fechaInicio.toISOString(),
      },
      fechaRegistro: inscripcion.fechaRegistro.toISOString(),
    };
  },

  async update(id: string, data: updateInscripcionInput) {
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
    if (!inscripcion) {
      throw new NotFoundError("Inscripción no encontrada");
    }
    return {
      ...inscripcion,
      evento: {
        ...inscripcion.evento,
        fechaInicio: inscripcion.evento.fechaInicio.toISOString(),
      },
      fechaRegistro: inscripcion.fechaRegistro.toISOString(),
    };
  },
};
