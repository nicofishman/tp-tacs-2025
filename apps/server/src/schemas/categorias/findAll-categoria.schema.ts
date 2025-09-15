import z from "zod";
import { CategoriaSchema } from "./categoria.schema";

export const findAllCategoriaOutputSchema = z.array(CategoriaSchema);
