import type { EstadoInscripcion } from "@prisma/client";

export interface UpdateInscripcionDto {
	estado?: EstadoInscripcion;
	fechaRegistro?: string; // formato ISO
}
