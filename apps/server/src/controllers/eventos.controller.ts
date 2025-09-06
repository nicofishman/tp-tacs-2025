import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { ReplaceEventoDto } from "@/dtos/eventos/input/replace-evento.dto";
import type { UpdateEventoDto } from "@/dtos/eventos/input/update-evento.dto";
import { ValidationError } from "@/exceptions/ValidationError";
import {
	CreateEventoSchema,
	IdSchema,
	ReplaceEventoSchema,
	UpdateEventoSchema,
} from "@/schemas/eventos/evento.input.schema";
import { EventosService } from "../services/eventos.service";

export const EventosController = {
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
};
