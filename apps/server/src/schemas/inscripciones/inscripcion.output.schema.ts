import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";
import { EventoOutputSchema } from "../eventos/evento.output.schema";
import { UsuarioOutputSchema } from "../usuarios/usuario.output.schema";

export const inscripcionOutputSchema = z.object({
  estado: z.enum(
    Object.values(EstadoInscripcion) as [
      EstadoInscripcion,
      ...EstadoInscripcion[],
    ],
    {
      message: "Estado inválido",
    },
  ),
  evento: EventoOutputSchema,
  fechaRegistro: z.iso.datetime(),
  id: z.uuid(),
  usuario: UsuarioOutputSchema,
});
