export enum EstadoEvento {
  FINALIZADO = "FINALIZADO",
  EN_PROCESO = "EN_PROCESO",
  CANCELADO = "CANCELADO",
  PENDIENTE = "PENDIENTE",
}

export enum EstadoInscripcion {
  CONFIRMADO = "CONFIRMADO",
  WAITLIST = "WAITLIST",
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;       // formato ISO
  horaInicio: string;  // "HH:mm"
  duracionHoras: number;
  duracionMinutos: number;
  ubicacion: string;
  cupoMaximo: number;
  cupoMinimo?: number;
  precio: number;
  categoria: Categoria;
  estado: EstadoEvento;
  organizador: Usuario;
}

export interface Inscripcion {
  id: string;
  usuario: Usuario;
  evento: Evento;
  estado: EstadoInscripcion;
  fechaRegistro: string; // formato ISO
}
