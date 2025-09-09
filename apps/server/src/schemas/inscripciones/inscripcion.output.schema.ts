import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";
import { EventoOutputSchema } from "../eventos/evento.output.schema";
import { UsuarioOutputSchema } from "../usuarios/usuario.output.schema";

export const inscripcionOutputSchema = z.object({
  estado: z.nativeEnum(EstadoInscripcion, {
    message: "Estado inválido",
  }),
  evento: EventoOutputSchema,
  fechaRegistro: z.string().datetime(),
  id: z.string().uuid(),
  usuario: UsuarioOutputSchema,
});
