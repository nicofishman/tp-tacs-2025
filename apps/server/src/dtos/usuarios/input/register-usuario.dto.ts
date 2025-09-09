import type { RolUsuario } from "@prisma/client";

export interface RegisterUsuarioDto {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
}
