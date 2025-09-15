import { RolUsuario } from "@prisma/client";
import z from "zod";

export const usuarioSchema = z.object({
  email: z.email(),
  id: z.string().min(1, { error: "El ID de usuario no puede estar vacío" }),
  nombre: z.string().min(1, { error: "El nombre no puede estar vacío" }),
  password: z
    .string({ error: "La contraseña es requerida" })
    .min(6, { error: "La contraseña debe tener al menos 6 caracteres" }),
  rol: z.enum(RolUsuario),
});
