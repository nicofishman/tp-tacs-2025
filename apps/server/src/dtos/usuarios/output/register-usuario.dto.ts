import type { RolUsuario } from "@prisma/client";
// SOLO PARA PROBAR QUE SE HASHEO LA CONTRASEÑA
export interface UsuarioOutputDto {
  id: string;
  nombre: string;
  password: string;
  email: string;
  rol: RolUsuario;
}
