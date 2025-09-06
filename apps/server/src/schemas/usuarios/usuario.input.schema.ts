import { RolUsuario } from "@prisma/client";
import { z } from "zod";

// Validaciones de dtos de usuario usando Zod

export const CreateUsuarioSchema = z.object({
	nombre: z
		.string({
			required_error: "El nombre es requerido",
			invalid_type_error: "El nombre debe ser un string",
		})
		.min(1, { message: "El nombre no puede estar vacío" }),
	email: z
		.string({
			required_error: "El email es requerido",
		})
		.email("Email inválido"),
	rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
		message: "Rol inválido",
	}),
});

export type CreateUsuarioInput = z.infer<typeof CreateUsuarioSchema>;

export const IdSchema = z
	.string()
	.min(1, "ID de usuario requerido y debe ser tipo string");

export const ReplaceUsuarioSchema = z.object({
	nombre: z
		.string({
			required_error: "El nombre es requerido",
			invalid_type_error: "El nombre debe ser un string",
		})
		.min(1, { message: "El nombre no puede estar vacío" }),
	email: z
		.string({
			required_error: "El email es requerido",
		})
		.email("Email inválido"),
	rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
		message: "Rol inválido",
	}),
});

export type ReplaceUsuarioInput = z.infer<typeof ReplaceUsuarioSchema>;

export const UpdateUsuarioSchema = z.object({
	nombre: z
		.string({
			invalid_type_error: "El nombre debe ser un string",
		})
		.min(1, "El nombre no puede estar vacío")
		.optional(),
	email: z.string().email("Email inválido").optional(),
	rol: z
		.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
			message: "Rol inválido",
		})
		.optional(),
});

export type UpdateUsuarioInput = z.infer<typeof UpdateUsuarioSchema>;
