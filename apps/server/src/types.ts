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
	ubicacion: {
		direccion: string;
		lat: number;
		lng: number;
	};
	cupoMaximo: number;
	cupoMinimo?: number;
	precio: number;
	categoriaId: string;
	estado: EstadoEvento;
	organizadorId: string;
}

export interface Categoria {
	id: string;
	nombre: string;
}

export interface Usuario {
	id: string;
	nombre: string;
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
