import type { CategoriaOutputDto } from "@/dtos/categorias/output/categoria.dto";
import type { UsuarioOutputDto } from "@/dtos/usuarios/output/usuario.dto";
import type { Duracion, Ubicacion } from "@/types";

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
