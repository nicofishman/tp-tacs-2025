import { z } from "zod";

export const CategoriaSchema = z.object({
  id: z.string().min(1, "El ID de categoria no puede estar vacío"),
  nombre: z
    .string({
      error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre no puede estar vacío"),
});
