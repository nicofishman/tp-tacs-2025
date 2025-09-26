import type { CategoriaOutputDto } from "@server/dtos/categorias/output/categoria.dto";
import type { UsuarioOutputDto } from "@server/dtos/usuarios/output/usuario.dto";
import type { Duracion, Ubicacion } from "@server/types";

export interface EventoOutputDto {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  duracion: Duracion;
  ubicacion: Ubicacion;
  cupoMaximo: number;
  cupoMinimo?: number;
  precio: number;
  categoria: CategoriaOutputDto;
  estado: string;
  organizador: UsuarioOutputDto;
}
