import { z } from "zod";

export const CreateCategoriaSchema = z.object({
	nombre: z
		.string({
			required_error: "El nombre es requerido",
			invalid_type_error: "El nombre debe ser un texto",
		})
		.min(1, "El nombre no puede estar vacío"),
});

export type CreateCategoriaInput = z.infer<typeof CreateCategoriaSchema>;

export const IdSchema = z.string({
	required_error: "El ID de categoría es requerido",
	invalid_type_error: "El ID de categoría debe ser un texto",
});
