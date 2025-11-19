import { RolUsuario } from "@prisma/client";
import z from "zod";
import { passwordSchema, usuarioSchema } from "../usuarios/usuario.schema";

export const signUpSchema = usuarioSchema
  .pick({
    email: true,
    nombre: true,
  })
  .extend({
    password: passwordSchema,
    rol: z.enum(RolUsuario).optional(),
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
