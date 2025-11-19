import { EstadoInscripcion } from "@prisma/client";
import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { eventoSchema } from "./evento.schema";

export const findParticipantsEventosOutputSchema = eventoSchema
  .pick({
    id: true,
    titulo: true,
  })
  .extend({
    participantes: z
      .array(
        z.object({
          estado: z.nativeEnum(EstadoInscripcion),
          fechaRegistro: z.string(),
          usuario: usuarioSchema.pick({
            email: true,
            id: true,
            nombre: true,
          }),
        }),
      )
      .optional(),
  });
