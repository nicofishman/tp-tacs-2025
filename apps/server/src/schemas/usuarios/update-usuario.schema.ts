import type z from "zod";
import { usuarioSchema } from "./usuario.schema";

export const updateUsuarioInputSchema = usuarioSchema
  .omit({
    id: true,
    password: true,
  })
  .partial();

export type UpdateUsuarioInput = z.infer<typeof updateUsuarioInputSchema>;

export const updateUsuarioOutputSchema = usuarioSchema;

export type UpdateUsuarioOutput = z.infer<typeof updateUsuarioOutputSchema>;
