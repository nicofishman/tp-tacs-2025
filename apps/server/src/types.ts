import type {
  EstadoEvento,
  EstadoInscripcion,
  RolUsuario,
} from "@prisma/client";

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string; // formato ISO (ej: "2025-09-20T15:30:00Z")
  duracion: Duracion;
  ubicacion: Ubicacion;
  cupoMaximo: number;
  cupoMinimo?: number;
  precio: number;
  categoria: Categoria;
  estado: EstadoEvento;
  organizador: Usuario;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  password: string;
  email: string;
  rol: RolUsuario;
}

export interface Inscripcion {
  id: string;
  usuario: Usuario;
  evento: Evento;
  estado: EstadoInscripcion;
  fechaRegistro: string; // formato ISO
}

export interface Duracion {
  horas: number;
  minutos: number;
}

export interface Ubicacion {
  direccion: string;
  lat: number;
  lng: number;
}
