import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { FindEventosQueryDto } from "@/dtos/eventos/input/register-evento.dto";
import type { ReplaceEventoDto } from "@/dtos/eventos/input/replace-evento.dto";
import type { UpdateEventoDto } from "@/dtos/eventos/input/update-evento.dto";
import { ValidationError } from "@/exceptions/ValidationError";
import {
  CreateEventoSchema,
  FindEventosQuerySchema,
  IdSchema,
  ReplaceEventoSchema,
  UpdateEventoSchema,
} from "@/schemas/eventos/evento.input.schema";
import { EventosService } from "../services/eventos.service";

export const EventosController = {
  async create(data: CreateEventoDto) {
    const resultData = CreateEventoSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await EventosService.create(resultData.data);
  },

  async delete(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    await EventosService.delete(id);
  },
  async findAll() {
    return await EventosService.findAll();
  },

  async findById(id: string) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await EventosService.findById(id);
  },

  async findMany(eventosQuery: FindEventosQueryDto) {
    const resultData = FindEventosQuerySchema.safeParse(eventosQuery);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await EventosService.findMany(resultData.data);
  },

  async findParticipantsByEvent(eventId: string) {
    const resultEventId = IdSchema.safeParse(eventId);
    if (!resultEventId.success) {
      const message = resultEventId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación en eventId: ${message}`);
    }
    return await EventosService.findParticipantsByEvent(resultEventId.data);
  },

  async registerToEvent(eventId: string, userId: string) {
    const resultEventId = IdSchema.safeParse(eventId);
    if (!resultEventId.success) {
      const message = resultEventId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación en eventId: ${message}`);
    }

    const resultUserId = IdSchema.safeParse(userId);
    if (!resultUserId.success) {
      const message = resultUserId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación en userId: ${message}`);
    }

    return await EventosService.registerToEvent(
      resultEventId.data,
      resultUserId.data,
    );
  },

  async replace(id: string, data: ReplaceEventoDto) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = ReplaceEventoSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await EventosService.replace(id, resultData.data);
  },

  async unregisterFromEvent(eventId: string, userId: string) {
    const resultEventId = IdSchema.safeParse(eventId);
    if (!resultEventId.success) {
      const message = resultEventId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación en eventId: ${message}`);
    }

    const resultUserId = IdSchema.safeParse(userId);
    if (!resultUserId.success) {
      const message = resultUserId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación en userId: ${message}`);
    }

    return await EventosService.unregisterFromEvent(
      resultEventId.data,
      resultUserId.data,
    );
  },

  async update(id: string, data: UpdateEventoDto) {
    const resultId = IdSchema.safeParse(id);
    if (!resultId.success) {
      const message = resultId.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    const resultData = UpdateEventoSchema.safeParse(data);
    if (!resultData.success) {
      const message = resultData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ValidationError(`Error de validación: ${message}`);
    }
    return await EventosService.update(id, resultData.data);
  },
};
