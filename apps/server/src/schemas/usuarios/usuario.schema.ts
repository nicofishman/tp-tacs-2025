import { RolUsuario } from "@prisma/client";
import z from "zod";

export const usuarioSchema = z.object({
  email: z.email({ error: "El email es requerido" }),
  id: z
    .string({ error: "El ID de usuario es requerido" })
    .min(1, { error: "El ID de usuario no puede estar vacío" }),
  nombre: z
    .string({ error: "El nombre es requerido" })
    .min(1, { error: "El nombre no puede estar vacío" }),
  password: z
    .string({ error: "La contraseña es requerida" })
    .min(8, { error: "La contraseña debe tener al menos 8 caracteres" }),
  rol: z.enum(RolUsuario, {
    error: "El rol no es válido",
  }),
});
