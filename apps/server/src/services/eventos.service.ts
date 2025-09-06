import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";
import { CategoriasRepository } from "@/repositories/categorias.repository.js";
import { UsuariosRepository } from "@/repositories/usuarios.repository.js";
import type { CreateEventoInput } from "@/schemas/eventos/evento.input.schema.js";
import type { Evento } from "@/types.js";
import { EventosRepository } from "../repositories/eventos.repository.js";

export const EventosService = {
	async findAll() {
		const eventos: Evento[] = await EventosRepository.findAll();
		return eventos;
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
				"Debes enviar al menos un campo para actualizar",
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
};
