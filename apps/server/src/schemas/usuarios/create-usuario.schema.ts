import type z from "zod";
import { usuarioSchema } from "./usuario.schema";

export const createUsuarioInputSchema = usuarioSchema.omit({ id: true });

export type CreateUsuarioInput = z.infer<typeof createUsuarioInputSchema>;

export const createUsuarioOutputSchema = usuarioSchema;

export type CreateUsuarioOutput = z.infer<typeof createUsuarioOutputSchema>;
