import type { RolUsuario } from "@/types";

export interface ReplaceUsuarioDto {
	nombre: string;
	email: string;
	rol: RolUsuario;
}
