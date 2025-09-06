import type { UsuarioOutputDto } from "@/dtos/usuarios/output/usuario.dto";
import type { Usuario } from "@/types";
import { RolUsuario } from "@prisma/client";
import { z } from "zod";

export const UsuarioOutputSchema = z.object({
	id: z.string(),
	nombre: z.string(),
	email: z.string().email(),
	rol: z.enum(Object.values(RolUsuario) as [RolUsuario, ...RolUsuario[]], {
		message: "Rol inválido",
	}),
});

// Puedes usar el tipo manual para tipar funciones y el schema para validar la salida:
export function mapUsuarioToOutput(usuario: Usuario): UsuarioOutputDto {
	return UsuarioOutputSchema.parse(usuario);
}
