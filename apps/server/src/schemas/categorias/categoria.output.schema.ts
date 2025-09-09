import { z } from "zod";
import type { Categoria } from "@/types";

export const CategoriaOutputSchema = z.object({
  id: z.string(),
  nombre: z.string(),
});

export function mapCategoriaToOutput(categoria: Categoria) {
  return CategoriaOutputSchema.parse(categoria);
}
