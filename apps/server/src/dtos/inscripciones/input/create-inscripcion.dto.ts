import type { EstadoInscripcion } from "@prisma/client";

export interface CreateInscripcionDto {
	usuarioId: string;
	eventoId: string;
	estado: EstadoInscripcion;
	fechaRegistro: string; // formato ISO
}
