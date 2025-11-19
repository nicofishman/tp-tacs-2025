import { type Categoria, EstadoInscripcion, type Evento } from "@prisma/client";
import { NotFoundError } from "@server/exceptions/NotFoundError";
import { QueryError } from "@server/exceptions/QueryError";
import { ValidationError } from "@server/exceptions/ValidationError";
import { CategoriasRepository } from "@server/repositories/categorias.repository.js";
import { UsuariosRepository } from "@server/repositories/usuarios.repository.js";
import type { CreateEventoInput } from "@server/schemas/eventos/create-evento.schema.js";
import type { FindAllEventoQuery } from "@server/schemas/eventos/findAll-evento.schema.js";
import type { UpdateEventoInput } from "@server/schemas/eventos/update-evento.schema.js";
import { EventosRepository } from "../repositories/eventos.repository.js";
import { InscripcionesRepository } from "../repositories/inscripciones.repository";

export const EventosService = {
  async create(organizadorId: string, data: CreateEventoInput) {
    const categoria = await CategoriasRepository.findById(data.categoriaId);
    if (!categoria) {
      throw new NotFoundError("Categoría no encontrada");
    }
    const organizador = await UsuariosRepository.findById(organizadorId);
    if (!organizador) {
      throw new NotFoundError("Organizador no encontrado");
    }
    if (data.fechaInicio) {
      const nuevaFecha = new Date(data.fechaInicio);
      if (nuevaFecha < new Date()) {
        throw new ValidationError(
          "La fecha de inicio no puede ser una fecha pasada",
        );
      }
    }
    const eventoParaCrear: Omit<
      Evento,
      "id" | "createdAt" | "updatedAt" | "estado" | "version"
    > = {
      ...data,
      fechaInicio: new Date(data.fechaInicio),
      organizadorId,
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

  async findByOrganizadorId(organizadorId: string) {
    const eventos = await EventosRepository.findByUserId(organizadorId);
    return eventos;
  },

  async findParticipantsByEvent(eventId: string) {
    const evento = await EventosRepository.findById(eventId);
    if (!evento) {
      throw new NotFoundError("Evento no encontrado");
    }

    const inscripcionesDelEvento =
      await InscripcionesRepository.findByEventId(eventId);

    // Filtrar inscripciones canceladas
    const inscripcionesActivas = inscripcionesDelEvento.filter(
      (inscripcion) => inscripcion.estado !== EstadoInscripcion.CANCELADO,
    );

    // Devolver inscripciones completas con usuario, estado y fechaRegistro
    const participantes = inscripcionesActivas.map((inscripcion) => ({
      estado: inscripcion.estado,
      fechaRegistro: inscripcion.fechaRegistro.toISOString(),
      usuario: {
        email: inscripcion.usuario.email,
        id: inscripcion.usuario.id,
        nombre: inscripcion.usuario.nombre,
      },
    }));

    const eventoConParticipantes = {
      id: evento.id,
      participantes,
      titulo: evento.titulo,
    };

    return eventoConParticipantes;
  },

  async registerToEvent(eventId: string, userId: string) {
    // Función auxiliar para realizar el intento de inscripción
    async function attemptRegistration(_isRetry = false) {
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
      if (existingRegistration.estado !== EstadoInscripcion.CANCELADO) {
        throw new ValidationError(
          "El usuario ya está registrado en este evento.",
        );
      }
    }

      // Optimistic Concurrency Control: usar versión para prevenir condiciones de carrera
      const currentVersion = evento.version ?? 0;

      // Contar inscripciones confirmadas para determinar el estado
      const confirmedRegistrations =
        await InscripcionesRepository.findConfirmedRegistrationsByEvent(
          eventId,
        );
      const hasAvailableSpots =
        confirmedRegistrations.length < evento.cupoMaximo;
      const estado: EstadoInscripcion = hasAvailableSpots
        ? EstadoInscripcion.CONFIRMADO
        : EstadoInscripcion.WAITLIST;

      // Intentar crear la inscripción y actualizar el evento con verificación de versión
      // Solo se actualiza si la versión no ha cambiado desde que la leímos
      const response =
        await InscripcionesRepository.registerUserToEventWithVersion(
          eventId,
          userId,
          estado,
          currentVersion,
        );

      return {
        ...response,
        evento: {
          ...response.evento,
          fechaInicio: response.evento.fechaInicio.toISOString(),
        },
        fechaRegistro: response.fechaRegistro.toISOString(),
      };
    }

    try {
      // Primer intento de inscripción
      return await attemptRegistration(false);
    } catch (error) {
      // Si falla por discordancia de versión, hacer un retry una vez
      if (
        error instanceof QueryError &&
        error.message ===
          "El cupo del evento ha cambiado. Por favor, intenta nuevamente."
      ) {
        // Retry: leer nuevamente el evento con la versión actualizada y reintentar
        return await attemptRegistration(true);
      }
      // Si es otro tipo de error, re-lanzarlo
      throw error;
    }
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

    if (
      data.fechaInicio &&
      new Date(data.fechaInicio).toISOString() !==
        eventoExistente.fechaInicio.toISOString()
    ) {
      const nuevaFecha = new Date(data.fechaInicio);
      if (nuevaFecha < new Date()) {
        throw new ValidationError(
          "La fecha de inicio no puede ser una fecha pasada",
        );
      }
    }

    const cupoExistente = eventoExistente.cupoMaximo;
    if (data.cupoMaximo !== null && data.cupoMaximo !== undefined) {
      if (data.cupoMaximo < cupoExistente) {
        const inscripcionesConfirmadas =
          await InscripcionesRepository.findConfirmedRegistrationsByEvent(id);
        if (data.cupoMaximo < inscripcionesConfirmadas.length) {
          throw new ValidationError(
            `El cupo máximo no puede ser menor a la cantidad de inscripciones confirmadas (${inscripcionesConfirmadas.length})`,
          );
        }
      }

      if (data.cupoMaximo > cupoExistente) {
        const lugaresNuevos = data.cupoMaximo - cupoExistente;
        const waitlist = await InscripcionesRepository.findWaitlistByEvent(id);
        for (let i = 0; i < lugaresNuevos && i < waitlist.length; i++) {
          await InscripcionesRepository.promoteFromWaitlist(waitlist[i].id);
        }
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
