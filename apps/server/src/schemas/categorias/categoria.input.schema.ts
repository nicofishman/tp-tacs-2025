import { z } from "zod";

export const CreateCategoriaSchema = z.object({
  nombre: z
    .string({
      error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre no puede estar vacío"),
});

export type CreateCategoriaDto = z.infer<typeof CreateCategoriaSchema>;

export const IdSchema = z.string({
  error: "El ID de categoría debe ser un texto",
});
