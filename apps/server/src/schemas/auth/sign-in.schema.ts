import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const signInSchema = usuarioSchema.pick({
  email: true,
  password: true,
});

export const signInResponseSchema = z.object({
  user: usuarioSchema.omit({ password: true }),
});
