import z from "zod";
import { categoriaSchema } from "./categoria.schema";

export const findAllCategoriaOutputSchema = z.array(categoriaSchema);
