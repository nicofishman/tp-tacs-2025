import { RolUsuario } from "@prisma/client";
import { z } from "zod";

// Validaciones de dtos de usuario usando Zod

export const CreateUsuarioSchema = z.object({
  email: z.email(),
  nombre: z
    .string({
      error: "El nombre debe ser un string",
    })
    .min(1, { error: "El nombre no puede estar vacío" }),
  rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
    error: "Rol inválido",
  }),
});

export type CreateUsuarioDto = z.infer<typeof CreateUsuarioSchema>;

export const RegisterUsuarioSchema = CreateUsuarioSchema.extend({
  password: z.string({
    error: "La contraseña debe ser un string",
  }),
});

export type RegisterUsuarioDto = z.infer<typeof RegisterUsuarioSchema>;

export const ReplaceUsuarioSchema = z.object({
  email: z.email(),
  nombre: z
    .string({
      error: "El nombre debe ser un string",
    })
    .min(1, { error: "El nombre no puede estar vacío" }),
  rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
    error: "Rol inválido",
  }),
});

export type ReplaceUsuarioDto = z.infer<typeof ReplaceUsuarioSchema>;

export const UpdateUsuarioSchema = z.object({
  email: z.email().optional(),
  nombre: z
    .string({
      error: "El nombre debe ser un string",
    })
    .min(1, "El nombre no puede estar vacío")
    .optional(),
  rol: z
    .enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
      error: "Rol inválido",
    })
    .optional(),
});

export type UpdateUsuarioDto = z.infer<typeof UpdateUsuarioSchema>;

export const IdSchema = z.string({
  error: "El ID de usuario debe ser un string",
});
