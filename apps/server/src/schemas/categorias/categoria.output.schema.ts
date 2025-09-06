import type { Categoria } from "@/types";
import { z } from "zod";

export const CategoriaOutputSchema = z.object({
	id: z.string(),
	nombre: z.string(),
});

export function mapCategoriaToOutput(categoria: Categoria) {
	return CategoriaOutputSchema.parse(categoria);
}
