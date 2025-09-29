import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const signUpSchema = usuarioSchema.pick({
  email: true,
  nombre: true,
  password: true,
});

export const signUpResponseSchema = usuarioSchema
  .pick({
    email: true,
    id: true,
    nombre: true,
    rol: true,
  })
  .extend({
    token: z.string(),
  });
