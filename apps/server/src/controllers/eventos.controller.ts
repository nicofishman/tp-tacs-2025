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
import { z } from "zod";
import { EventosService } from "../services/eventos.service";

const FindEventosQuerySchema = z.object({
	dateFrom: z.string().datetime().optional(),
	dateTo: z.string().datetime().optional(),
	categoriaId: z.string().uuid().optional(),
	priceMin: z.coerce.number().nonnegative().optional(),
	priceMax: z.coerce.number().nonnegative().optional(),
	q: z.string().min(1).optional(),
	limit: z.coerce.number().int().positive().max(100).default(20).optional(),
	page: z.coerce.number().int().positive().default(1).optional(),
	orderBy: z.enum(["fechaInicio", "precio"]).optional(),
	order: z.enum(["asc", "desc"]).optional(),
});

export const EventosController = {
	async findAll() {
		return await EventosService.findAll();
	},

	async findMany(raw: unknown) {
		const parsed = FindEventosQuerySchema.safeParse(raw);
		if (!parsed.success) {
			const message = parsed.error.issues.map((i) => i.message).join(", ");
			throw new ValidationError(`Error de validación: ${message}`);
		}
		return await EventosService.findMany(parsed.data);
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
			resultUserId.data
		);
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
