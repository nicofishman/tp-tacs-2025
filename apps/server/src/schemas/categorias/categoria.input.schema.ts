import { z } from "zod";

export const CreateCategoriaSchema = z.object({
  nombre: z
    .string({
      invalid_type_error: "El nombre debe ser un texto",
      required_error: "El nombre es requerido",
    })
    .min(1, "El nombre no puede estar vacío"),
});

export type CreateCategoriaInput = z.infer<typeof CreateCategoriaSchema>;

export const IdSchema = z.string({
  invalid_type_error: "El ID de categoría debe ser un texto",
  required_error: "El ID de categoría es requerido",
});
