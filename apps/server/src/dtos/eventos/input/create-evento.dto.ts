export interface CreateEventoDto {
	titulo: string;
	descripcion: string;
	fechaInicio: string; // Formato ISO (ej: "2025-09-20T15:30:00Z")
	duracion: {
		horas: number;
		minutos: number;
	};
	ubicacion: {
		direccion: string;
		lat: number;
		lng: number;
	};
	cupoMaximo: number;
	cupoMinimo?: number;
	precio: number;
	categoriaId: string;
	organizadorId: string;
}
