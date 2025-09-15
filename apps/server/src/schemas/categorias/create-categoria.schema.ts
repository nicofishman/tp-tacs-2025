import type z from "zod";
import { categoriaSchema } from "../categorias/categoria.schema";

export const createCategoriaSchema = categoriaSchema.omit({ id: true });

export type CreateCategoriaInput = z.infer<typeof createCategoriaSchema>;

export const createCategoriaOutputSchema = categoriaSchema.omit({ id: true });
