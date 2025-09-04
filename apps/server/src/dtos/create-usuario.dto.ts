import { RolUsuario } from '../types';

export interface CreateUsuarioDto {
  nombre: string;
  email: string;
  rol: RolUsuario;
}