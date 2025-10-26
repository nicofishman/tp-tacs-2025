import z from "zod";
import { passwordSchema, usuarioSchema } from "../usuarios/usuario.schema";

export const signInSchema = usuarioSchema
  .pick({
    email: true,
  })
  .extend({
    password: passwordSchema,
  });

export const signInResponseSchema = z.object({
  user: usuarioSchema,
});
