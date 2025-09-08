import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { CategoriasRepository } from "@/repositories/categorias.repository.js";
import { UsuariosRepository } from "@/repositories/usuarios.repository.js";
import type { CreateEventoInput } from "@/schemas/eventos/evento.input.schema.js";
import type { Evento } from "@/types.js";
import { EstadoInscripcion } from "@prisma/client";
import { EventosRepository } from "../repositories/eventos.repository.js";
import { InscripcionesRepository } from "../repositories/inscripciones.repository";

type FindManyFilters = {
	dateFrom?: string;
	dateTo?: string;
	categoriaId?: string;
	priceMin?: number;
	priceMax?: number;
	q?: string;
	limit?: number;
	page?: number;
	orderBy?: "fechaInicio" | "precio";
	order?: "asc" | "desc";
};

export const EventosService = {
	async findAll() {
		const eventos: Evento[] = await EventosRepository.findAll();
		return eventos;
	},

	async findMany(f: FindManyFilters) {
		const page = f.page ?? 1;
		const limit = f.limit ?? 20;

		const filtrados = await EventosRepository.findMany({
			dateFrom: f.dateFrom,
			dateTo: f.dateTo,
			categoriaId: f.categoriaId,
			priceMin: f.priceMin,
			priceMax: f.priceMax,
			q: f.q,
			limit,
			page,
			orderBy: f.orderBy,
			order: f.order,
		});

		return {
			page,
			limit,
			count: filtrados.length,
			items: filtrados,
		};
	},

	async findById(id: string) {
		const evento: Evento | null = await EventosRepository.findById(id);
		if (!evento) {
			throw new NotFoundError("Evento no encontrado");
		}
		return evento;
	},

	async create(data: CreateEventoInput) {
		const categoria = await CategoriasRepository.findById(data.categoriaId);
		if (!categoria) {
			throw new NotFoundError("Categoría no encontrada");
		}
		const organizador = await UsuariosRepository.findById(data.organizadorId);
		if (!organizador) {
			throw new NotFoundError("Organizador no encontrado");
		}

		const eventoParaCrear: Omit<Evento, "id"> = {
			...data,
			categoria: categoria,
			organizador: organizador,
		};
		const evento = await EventosRepository.create(eventoParaCrear);
		return evento;
	},

	async replace(id: string, data: CreateEventoInput) {
		const eventoExistente = await EventosRepository.findById(id);
		if (!eventoExistente) {
			throw new NotFoundError("Evento no encontrado");
		}

		const categoria = await CategoriasRepository.findById(data.categoriaId);
		if (!categoria) {
			throw new NotFoundError("Categoría no encontrada");
		}
		const organizador = await UsuariosRepository.findById(data.organizadorId);
		if (!organizador) {
			throw new NotFoundError("Organizador no encontrado");
		}

		const eventoParaActualizar: Evento = {
			...eventoExistente,
			...data,
			categoria: categoria,
			organizador: organizador,
		};
		const evento = await EventosRepository.update(id, eventoParaActualizar);
		return evento;
	},

	async update(id: string, data: Partial<CreateEventoInput>) {
		if (Object.keys(data).length === 0) {
			throw new ValidationError(
				"Debes enviar al menos un campo para actualizar"
			);
		}

		const eventoExistente = await EventosRepository.findById(id);
		if (!eventoExistente) {
			throw new NotFoundError("Evento no encontrado");
		}

		let categoria = null;
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
			categoria: categoria ? categoria : eventoExistente.categoria,
			organizador: organizador ? organizador : eventoExistente.organizador,
		};
		const evento = await EventosRepository.update(id, eventoParaActualizar);
		return evento;
	},

	async delete(id: string) {
		const deleted = await EventosRepository.delete(id);
		if (!deleted) {
			throw new NotFoundError("Evento no encontrado");
		}
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
				"El usuario ya está registrado en este evento."
			);
		}

		// Verificar si hay cupo
		let estado: EstadoInscripcion = EstadoInscripcion.CONFIRMADO;
		const confirmedRegistrations =
			await InscripcionesRepository.findConfirmedRegistrationsByEvent(eventId);
		if (confirmedRegistrations.length >= evento.cupoMaximo) {
			estado = EstadoInscripcion.WAITLIST;
		}

		return await InscripcionesRepository.registerUserToEvent(
			eventId,
			userId,
			estado
		);
	},
};
