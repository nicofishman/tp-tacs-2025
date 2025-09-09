import { RolUsuario } from "@prisma/client";
import { z } from "zod";

// Validaciones de dtos de usuario usando Zod

export const CreateUsuarioSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("Email inválido"),
  nombre: z
    .string({
      invalid_type_error: "El nombre debe ser un string",
      required_error: "El nombre es requerido",
    })
    .min(1, { message: "El nombre no puede estar vacío" }),
  rol: z.nativeEnum(RolUsuario, {
    message: "Rol inválido",
  }),
});

export type CreateUsuarioInput = z.infer<typeof CreateUsuarioSchema>;

export const RegisterUsuarioSchema = CreateUsuarioSchema.extend({
  password: z.string({
    invalid_type_error: "La contraseña debe ser un string",
    required_error: "La contraseña es requerida",
  }),
});

export type RegisterUsuarioInput = z.infer<typeof RegisterUsuarioSchema>;

export const ReplaceUsuarioSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("Email inválido"),
  nombre: z
    .string({
      invalid_type_error: "El nombre debe ser un string",
      required_error: "El nombre es requerido",
    })
    .min(1, { message: "El nombre no puede estar vacío" }),
  rol: z.nativeEnum(RolUsuario, {
    message: "Rol inválido",
  }),
});

export type ReplaceUsuarioInput = z.infer<typeof ReplaceUsuarioSchema>;

export const UpdateUsuarioSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  nombre: z
    .string({
      invalid_type_error: "El nombre debe ser un string",
    })
    .min(1, "El nombre no puede estar vacío")
    .optional(),
  rol: z
    .nativeEnum(RolUsuario, {
      message: "Rol inválido",
    })
    .optional(),
});

export type UpdateUsuarioInput = z.infer<typeof UpdateUsuarioSchema>;

export const IdSchema = z.string({
  invalid_type_error: "El ID de usuario debe ser un texto",
  required_error: "El ID de usuario es requerido",
});
