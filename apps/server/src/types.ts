export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;       // formato ISO
  horaInicio: string;  // "HH:mm"
  duracion: Duracion;
  ubicacion: string;
  cupoMaximo: number;
  cupoMinimo?: number;
  precio: number;
  categoria: Categoria;
  estado: EstadoEvento;
  organizador: Usuario;
}

export enum EstadoEvento {
  FINALIZADO = "FINALIZADO",
  EN_PROCESO = "EN_PROCESO",
  CANCELADO = "CANCELADO",
  PENDIENTE = "PENDIENTE",
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

enum RolUsuario {
  ADMIN = "ADMIN",
  ORGANIZADOR = "ORGANIZADOR",
  PARTICIPANTE = "PARTICIPANTE"
}

export interface Inscripcion {
  id: string;
  usuario: Usuario;
  evento: Evento;
  estado: EstadoInscripcion;
  fechaRegistro: string; // formato ISO
}

export enum EstadoInscripcion {
  CONFIRMADO = "CONFIRMADO",
  WAITLIST = "WAITLIST",
}

export interface Duracion {
  horas: number;
  minutos: number;
}
