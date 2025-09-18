import type { EstadoInscripcion } from "@prisma/client";
import type { EventoOutputDto } from "@server/dtos/eventos/output/evento.dto";
import type { UsuarioOutputDto } from "@server/dtos/usuarios/output/usuario.dto";

export interface InscripcionDto {
  id: string;
  usuario: UsuarioOutputDto;
  evento: EventoOutputDto;
  estado: EstadoInscripcion;
  fechaRegistro: string; // formato ISO
}
