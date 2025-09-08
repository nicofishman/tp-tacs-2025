import type { EventoOutputDto } from "@/dtos/eventos/output/evento.dto";
import type { UsuarioOutputDto } from "@/dtos/usuarios/output/usuario.dto";
import type { EstadoInscripcion } from "@prisma/client";

export interface InscripcionDto {
	id: string;
	usuario: UsuarioOutputDto;
	evento: EventoOutputDto;
	estado: EstadoInscripcion;
	fechaRegistro: string; // formato ISO
}
