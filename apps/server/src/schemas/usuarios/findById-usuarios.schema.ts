import type z from "zod";
import { usuarioSchema } from "./usuario.schema";

export const findByIdUsuariosOutputSchema = usuarioSchema;

export type FindByIdUsuariosOutput = z.infer<
  typeof findByIdUsuariosOutputSchema
>;
