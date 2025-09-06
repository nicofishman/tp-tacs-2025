import type { RolUsuario } from "@prisma/client";

export interface ReplaceUsuarioDto {
	nombre: string;
	email: string;
	rol: RolUsuario;
}
