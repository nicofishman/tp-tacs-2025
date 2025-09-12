import { RolUsuario } from "@prisma/client";
import z from "zod";

export const idSchema = z.string();

export const usuarioSchema = z.object({
  email: z.email(),
  id: idSchema,
  nombre: z.string().min(1, { error: "El nombre no puede estar vacío" }),
  password: z.string(),
  rol: z.enum(RolUsuario),
});
