import type z from "zod";
import { usuarioSchema } from "./usuario.schema";

export const replaceUsuarioInputSchema = usuarioSchema.omit({
  id: true,
  password: true,
});

export type ReplaceUsuarioInput = z.infer<typeof replaceUsuarioInputSchema>;

export const replaceUsuarioOutputSchema = usuarioSchema;

export type ReplaceUsuarioOutput = z.infer<typeof replaceUsuarioOutputSchema>;
