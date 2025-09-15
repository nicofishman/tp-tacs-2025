import type { CreateEventoInput } from "@/schemas/eventos/create-evento.schema";
import type { FindAllEventoQuery } from "@/schemas/eventos/findAll-evento.schema";
import type { UpdateEventoInput } from "@/schemas/eventos/update-evento.schema";
import { EventosService } from "../services/eventos.service";

export const EventosController = {
  async create(data: CreateEventoInput) {
    return await EventosService.create(data);
  },

  async delete(id: string) {
    await EventosService.delete(id);
  },

  async findAll(eventosQuery: FindAllEventoQuery) {
    return await EventosService.findAll(eventosQuery);
  },

  async findById(id: string) {
    return await EventosService.findById(id);
  },

  async findParticipantsByEvent(eventId: string) {
    return await EventosService.findParticipantsByEvent(eventId);
  },

  async registerToEvent(eventId: string, userId: string) {
    return await EventosService.registerToEvent(eventId, userId);
  },

  async unregisterFromEvent(eventId: string, userId: string) {
    return await EventosService.unregisterFromEvent(eventId, userId);
  },

  async update(id: string, data: UpdateEventoInput) {
    return await EventosService.update(id, data);
  },
};
