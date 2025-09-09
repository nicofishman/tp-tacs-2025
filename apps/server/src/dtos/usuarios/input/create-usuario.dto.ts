import type { RolUsuario } from "@prisma/client";

export interface CreateUsuarioDto {
  nombre: string;
  email: string;
  rol: RolUsuario;
}
