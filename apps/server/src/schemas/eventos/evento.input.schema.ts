import { EstadoEvento } from "@prisma/client";
import { z } from "zod";

export const DuracionSchema = z.object({
	horas: z
		.number({
			required_error: "Las horas son requeridas",
			invalid_type_error: "Las horas deben ser un número",
		})
		.int()
		.min(0, "Las horas deben ser >= 0"),
	minutos: z
		.number({
			required_error: "Los minutos son requeridos",
			invalid_type_error: "Los minutos deben ser un número",
		})
		.int()
		.min(0, "Los minutos deben ser >= 0")
		.max(59, "Máximo 59 minutos"),
});

export const UbicacionSchema = z.object({
	direccion: z
		.string({
			required_error: "La dirección es requerida",
			invalid_type_error: "La dirección debe ser un texto",
		})
		.min(1, "La dirección no puede estar vacía"),
	lat: z.number({
		required_error: "La latitud es requerida",
		invalid_type_error: "La latitud debe ser un número",
	}),
	lng: z.number({
		required_error: "La longitud es requerida",
		invalid_type_error: "La longitud debe ser un número",
	}),
});

export const CreateEventoSchema = z.object({
	titulo: z
		.string({
			required_error: "El título es requerido",
			invalid_type_error: "El título debe ser un texto",
		})
		.min(1, "El título no puede estar vacío"),
	descripcion: z
		.string({
			required_error: "La descripción es requerida",
			invalid_type_error: "La descripción debe ser un texto",
		})
		.min(1, "La descripción no puede estar vacía"),
	fechaInicio: z
		.string({
			required_error: "La fecha de inicio es requerida",
			invalid_type_error: "La fecha de inicio debe ser un texto",
		})
		.refine((val) => !Number.isNaN(Date.parse(val)), {
			message: "Fecha inválida, debe ser formato ISO",
		}),
	duracion: DuracionSchema,
	ubicacion: UbicacionSchema,
	cupoMaximo: z
		.number({
			required_error: "El cupo máximo es requerido",
			invalid_type_error: "El cupo máximo debe ser un número",
		})
		.int()
		.min(1, "Cupo máximo debe ser >= 1"),
	cupoMinimo: z
		.number({
			invalid_type_error: "El cupo mínimo debe ser un número",
		})
		.int()
		.min(0, "Cupo mínimo debe ser >= 0")
		.default(0),
	precio: z
		.number({
			required_error: "El precio es requerido",
			invalid_type_error: "El precio debe ser un número",
		})
		.min(0, "El precio debe ser >= 0"),
	categoriaId: z
		.string({
			required_error: "La categoría es requerida",
			invalid_type_error: "La categoría debe ser un texto",
		})
		.min(1, "La categoría no puede estar vacía"),
	estado: z
		.enum(Object.values(EstadoEvento) as [EstadoEvento, ...EstadoEvento[]], {
			invalid_type_error: "El estado debe ser uno de los valores válidos",
		})
		.default(EstadoEvento.PENDIENTE),
	organizadorId: z
		.string({
			required_error: "El organizador es requerido",
			invalid_type_error: "El organizador debe ser un texto",
		})
		.min(1, "El organizador no puede estar vacío"),
});

export type CreateEventoInput = z.infer<typeof CreateEventoSchema>;

// Por el momento es igual, pero lo dejamos separado por si en el futuro cambia
export const ReplaceEventoSchema = CreateEventoSchema;
export type ReplaceEventoInput = z.infer<typeof ReplaceEventoSchema>;

export const UpdateEventoSchema = z.object({
	titulo: z.string().min(1, "El título no puede estar vacío").optional(),
	descripcion: z
		.string()
		.min(1, "La descripción no puede estar vacía")
		.optional(),
	fechaInicio: z
		.string()
		.refine((val) => !Number.isNaN(Date.parse(val)), {
			message: "Fecha inválida, debe ser formato ISO",
		})
		.optional(),
	duracion: DuracionSchema.optional(),
	ubicacion: UbicacionSchema.optional(),
	cupoMaximo: z.number().int().min(1, "Cupo máximo debe ser >= 1").optional(),
	cupoMinimo: z.number().int().min(0, "Cupo mínimo debe ser >= 0").optional(),
	precio: z.number().min(0, "El precio debe ser >= 0").optional(),
	categoriaId: z
		.string()
		.min(1, "La categoría no puede estar vacía")
		.optional(),
	estado: z
		.enum(Object.values(EstadoEvento) as [EstadoEvento, ...EstadoEvento[]], {
			invalid_type_error: "El estado debe ser uno de los valores válidos",
		})
		.optional(),
	organizadorId: z
		.string()
		.min(1, "El organizador no puede estar vacío")
		.optional(),
});

export type UpdateEventoInput = z.infer<typeof UpdateEventoSchema>;

export const IdSchema = z.string({
	required_error: "El ID de categoría es requerido",
	invalid_type_error: "El ID de categoría debe ser un texto",
});
