import type { RolUsuario } from "@prisma/client";

export interface UpdateUsuarioDto {
  nombre?: string;
  email?: string;
  rol?: RolUsuario;
}
