import { type Categoria, EstadoInscripcion, type Evento } from "@prisma/client";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { CategoriasRepository } from "@/repositories/categorias.repository.js";
import { UsuariosRepository } from "@/repositories/usuarios.repository.js";
import type { CreateEventoInput } from "@/schemas/eventos/create-evento.schema.js";
import type { FindAllEventoQuery } from "@/schemas/eventos/findAll-evento.schema.js";
import type { UpdateEventoInput } from "@/schemas/eventos/update-evento.schema.js";
import { EventosRepository } from "../repositories/eventos.repository.js";
import { InscripcionesRepository } from "../repositories/inscripciones.repository";

export const EventosService = {
  async create(data: CreateEventoInput) {
    const categoria = await CategoriasRepository.findById(data.categoriaId);
    if (!categoria) {
      throw new NotFoundError("Categoría no encontrada");
    }
    const organizador = await UsuariosRepository.findById(data.organizadorId);
    if (!organizador) {
      throw new NotFoundError("Organizador no encontrado");
    }
    const eventoParaCrear: Omit<Evento, "id" | "createdAt" | "updatedAt"> = {
      ...data,
      fechaInicio: new Date(data.fechaInicio),
    };
    const evento = await EventosRepository.create(eventoParaCrear);
    return evento;
  },

  async delete(id: string) {
    const deleted = await EventosRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Evento no encontrado");
    }
  },

  async findAll(f: FindAllEventoQuery) {
    const page = f.page ?? 1;
    const limit = f.limit ?? 20;

    const filtrados = await EventosRepository.findAll({
      categoriaId: f.categoriaId,
      dateFrom: f.dateFrom,
      dateTo: f.dateTo,
      limit,
      order: f.order,
      orderBy: f.orderBy,
      page,
      priceMax: f.priceMax,
      priceMin: f.priceMin,
      q: f.q,
    });

    return {
      count: filtrados.length,
      items: filtrados.map((evento) => ({
        ...evento,
        fechaInicio: evento.fechaInicio.toISOString(),
      })),
      limit,
      page,
    };
  },

  async findById(id: string) {
    const evento = await EventosRepository.findById(id);
    if (!evento) {
      throw new NotFoundError("Evento no encontrado");
    }
    return {
      ...evento,
      fechaInicio: evento.fechaInicio.toISOString(),
    };
  },

  async findParticipantsByEvent(eventId: string) {
    const evento = await EventosRepository.findById(eventId);
    if (!evento) {
      throw new NotFoundError("Evento no encontrado");
    }

    const inscripcionesDelEvento =
      await InscripcionesRepository.findByEventId(eventId);

    const inscripcionesConfirmadas = inscripcionesDelEvento.filter(
      (inscripcion) => inscripcion.estado === EstadoInscripcion.CONFIRMADO,
    );

    const participantes = inscripcionesConfirmadas.map(
      (inscripcion) => inscripcion.usuario,
    );

    const eventoConParticipantes = {
      id: evento.id,
      participantes,
      titulo: evento.titulo,
    };

    return eventoConParticipantes;
  },

  async registerToEvent(eventId: string, userId: string) {
    const evento = await EventosRepository.findById(eventId);
    if (!evento) {
      throw new NotFoundError(`El evento con ID ${eventId} no existe.`);
    }

    const usuario = await UsuariosRepository.findById(userId);
    if (!usuario) {
      throw new NotFoundError(`El usuario con ID ${userId} no existe.`);
    }

    // Verificar si el usuario ya está registrado en el evento
    const existingRegistration =
      await InscripcionesRepository.findUserRegistration(eventId, userId);
    if (existingRegistration) {
      throw new ValidationError(
        "El usuario ya está registrado en este evento.",
      );
    }

    // Verificar si hay cupo
    let estado: EstadoInscripcion = EstadoInscripcion.CONFIRMADO;
    const confirmedRegistrations =
      await InscripcionesRepository.findConfirmedRegistrationsByEvent(eventId);
    if (confirmedRegistrations.length >= evento.cupoMaximo) {
      estado = EstadoInscripcion.WAITLIST;
    }

    const response = await InscripcionesRepository.registerUserToEvent(
      eventId,
      userId,
      estado,
    );
    return {
      ...response,
      evento: {
        ...response.evento,
        fechaInicio: response.evento.fechaInicio.toISOString(),
      },
      fechaRegistro: response.fechaRegistro.toISOString(),
    };
  },

  async unregisterFromEvent(eventId: string, userId: string) {
    const evento = await EventosRepository.findById(eventId);
    if (!evento) {
      throw new NotFoundError(`El evento con ID ${eventId} no existe.`);
    }

    const usuario = await UsuariosRepository.findById(userId);
    if (!usuario) {
      throw new NotFoundError(`El usuario con ID ${userId} no existe.`);
    }

    // Verificar si el usuario está registrado en el evento
    const existingRegistration =
      await InscripcionesRepository.findUserRegistration(eventId, userId);
    if (!existingRegistration) {
      throw new ValidationError(
        "El usuario no está registrado en este evento.",
      );
    }

    // Cancelar la inscripción del usuario
    await InscripcionesRepository.cancelUserRegistration(eventId, userId);

    // Si el usuario tenía una inscripción confirmada, promover al siguiente en waitlist
    if (existingRegistration.estado === EstadoInscripcion.CONFIRMADO) {
      const nextInWaitlist =
        await InscripcionesRepository.findFirstInWaitlist(eventId);
      if (nextInWaitlist) {
        await InscripcionesRepository.promoteFromWaitlist(nextInWaitlist.id);
      }
    }

    return { message: "Inscripción cancelada exitosamente" };
  },

  async update(id: string, data: UpdateEventoInput) {
    if (Object.keys(data).length === 0) {
      throw new ValidationError(
        "Debes enviar al menos un campo para actualizar",
      );
    }

    const eventoExistente = await EventosRepository.findById(id);
    if (!eventoExistente) {
      throw new NotFoundError("Evento no encontrado");
    }

    let categoria: Categoria | null = null;
    if (data.categoriaId) {
      categoria = await CategoriasRepository.findById(data.categoriaId);
      if (!categoria) {
        throw new NotFoundError("Categoría no encontrada");
      }
    }

    let organizador = null;
    if (data.organizadorId) {
      organizador = await UsuariosRepository.findById(data.organizadorId);
      if (!organizador) {
        throw new NotFoundError("Organizador no encontrado");
      }
    }

    const eventoParaActualizar: Evento = {
      ...eventoExistente,
      ...data,
      fechaInicio: data.fechaInicio
        ? new Date(data.fechaInicio)
        : eventoExistente.fechaInicio,
    };
    const evento = await EventosRepository.update(id, eventoParaActualizar);
    if (!evento) {
      throw new NotFoundError("Evento no encontrado");
    }
    return {
      ...evento,
      fechaInicio: evento.fechaInicio.toISOString(),
    };
  },
};
