import { z } from "zod";

export const CreateCategoriaSchema = z.object({
  id: z.string().min(1, "El ID de categoria no puede estar vacío"),
  nombre: z.string().min(1, "El nombre no puede estar vacío"),
});
