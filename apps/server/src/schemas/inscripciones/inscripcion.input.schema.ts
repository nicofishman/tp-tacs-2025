import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";

export const createInscripcionSchema = z.object({
	usuarioId: z.string({
		required_error: "El ID de usuario es requerido",
		invalid_type_error: "El ID de usuario debe ser un string",
	}),
	eventoId: z.string({
		required_error: "El ID de evento es requerido",
		invalid_type_error: "El ID de evento debe ser un string",
	}),
	estado: z.enum(
		Object.values(EstadoInscripcion) as [
			EstadoInscripcion,
			...EstadoInscripcion[],
		],
		{
			message: "Estado inválido",
		},
	),
	fechaRegistro: z
		.string({
			required_error: "La fecha de registro es requerida",
			invalid_type_error: "La fecha de registro debe ser un string",
		})
		.datetime({ message: "Fecha de registro inválida" })
		.default(() => {
			const now = new Date();
			now.setHours(now.getHours() - 3);
			return now.toISOString();
		}),
});

export type CreateInscripcionInput = z.infer<typeof createInscripcionSchema>;

export const updateInscripcionSchema = z.object({
	estado: z
		.enum(
			Object.values(EstadoInscripcion) as [
				EstadoInscripcion,
				...EstadoInscripcion[],
			],
			{
				message: "Estado inválido",
			},
		)
		.optional(),
	fechaRegistro: z
		.string({
			invalid_type_error: "La fecha de registro debe ser un string",
		})
		.datetime({ message: "Fecha de registro inválida" })
		.optional(),
});

export type UpdateInscripcionInput = z.infer<typeof updateInscripcionSchema>;

export const IdSchema = z.string({
	required_error: "El ID de inscripción es requerido",
	invalid_type_error: "El ID de inscripción debe ser un texto",
});
