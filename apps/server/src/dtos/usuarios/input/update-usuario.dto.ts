import type { RolUsuario } from "@/types";

export interface UpdateUsuarioDto {
	nombre?: string;
	email?: string;
	rol?: RolUsuario;
}
