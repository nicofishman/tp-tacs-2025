import type z from "zod";
import { CategoriaSchema } from "../categorias/categoria.schema";

export const createCategoriaSchema = CategoriaSchema.omit({ id: true });

export type CreateCategoriaInput = z.infer<typeof createCategoriaSchema>;

export const createCategoriaOutputSchema = CategoriaSchema.omit({ id: true });
