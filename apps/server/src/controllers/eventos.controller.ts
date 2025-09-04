import type { CreateEventoDto } from "../dtos/eventos/input/create-evento.dto";
import { EventosService } from "../services/eventos.service";

export const EventosController = {
	async create(data: CreateEventoDto) {
		return await EventosService.create(data);
	},

	async findAll() {
		return await EventosService.findAll();
	},
};
