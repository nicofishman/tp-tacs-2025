import { RolUsuario } from "@prisma/client";
import { z } from "zod";
import type { UsuarioOutputDto } from "@/dtos/usuarios/output/usuario.dto";
import type { Usuario } from "@/types";

export const UsuarioOutputSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  nombre: z.string(),
  rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
    message: "Rol inválido",
  }),
});

export function mapUsuarioToOutput(usuario: Usuario): UsuarioOutputDto {
  return UsuarioOutputSchema.parse(usuario);
}

export const UsuarioOutputRegisterSchema = UsuarioOutputSchema.extend({
  password: z.string(),
});

export function mapUsuarioToOutputRegister(
  usuario: Usuario,
): UsuarioOutputDto & { password: string } {
  return UsuarioOutputRegisterSchema.parse(usuario);
}

export type UsuarioOutput = z.infer<typeof UsuarioOutputSchema>;
