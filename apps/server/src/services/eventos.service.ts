import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import { EventosRepository } from "@/repositories/eventos.repository";

import type { Evento } from "@/types";
import { EstadoEvento } from "@/types";
export const EventosService = {
	async findAll() {
		const eventos: Evento[] = await EventosRepository.findAll();
		return eventos;
	},

	async findById(id: string) {
		const evento: Evento | null = await EventosRepository.findById(id);
		if (!evento) {
			throw new Error("evento no encontrado");
		}
		return evento;
	},

	async create(data: CreateEventoDto) {
		if (
			!data.titulo ||
			!data.descripcion ||
			!data.fechaInicio ||
			!data.ubicacion ||
			!data.cupoMaximo ||
			!data.precio ||
			!data.categoriaId ||
			!data.organizadorId
		) {
			throw new Error("Datos enviados incompletos");
		}

		const eventoParaRepo = {
			titulo: data.titulo,
			descripcion: data.descripcion,
			fechaInicio: data.fechaInicio,
			duracion: data.duracion,
			ubicacion: data.ubicacion,
			cupoMaximo: data.cupoMaximo,
			cupoMinimo: data.cupoMinimo ?? 0,
			precio: data.precio,
			categoriaId: data.categoriaId,
			estado: EstadoEvento.PENDIENTE, // Usar el enum EstadoEvento
			organizadorId: data.organizadorId,
		};
		return await EventosRepository.create(eventoParaRepo);
	},

	async delete(id: string) {
		const eventoEliminado = await EventosRepository.delete(id);
		if (!eventoEliminado) {
			throw new Error("Evento not found");
		}
		return eventoEliminado;
	},
};
