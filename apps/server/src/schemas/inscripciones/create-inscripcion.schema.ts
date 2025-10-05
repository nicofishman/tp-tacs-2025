import type z from "zod";
import { eventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { inscripcionSchema } from "./inscripcion.schema";

export const createInscripcionInputSchema = inscripcionSchema.omit({
  id: true,
});

export type CreateInscripcionInput = z.infer<
  typeof createInscripcionInputSchema
>;

export const createInscripcionOutputSchema = inscripcionSchema
  .omit({
    eventoId: true,
    id: true,
    usuarioId: true,
  })
  .extend({
    evento: eventoSchema,
    usuario: usuarioSchema,
  });
