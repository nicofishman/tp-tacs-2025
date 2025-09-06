import type { RolUsuario } from "@prisma/client";

export interface UsuarioOutputDto {
	id: string;
	nombre: string;
	email: string;
	rol: RolUsuario;
}
