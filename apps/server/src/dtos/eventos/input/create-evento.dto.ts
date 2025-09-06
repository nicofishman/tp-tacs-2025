import type { Duracion, Ubicacion } from "@/types";

export interface CreateEventoDto {
	titulo: string;
	descripcion: string;
	fechaInicio: string;
	duracion: Duracion;
	ubicacion: Ubicacion;
	cupoMaximo: number;
	cupoMinimo?: number;
	precio: number;
	categoriaId: string;
	estado: string;
	organizadorId: string;
}
