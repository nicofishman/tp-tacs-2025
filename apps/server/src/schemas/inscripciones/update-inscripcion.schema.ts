import type z from "zod";
import { eventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { inscripcionSchema } from "./inscripcion.schema";

export const updateInscripcionInputSchema = inscripcionSchema
  .omit({
    id: true,
  })
  .partial();

export type updateInscripcionInput = z.infer<
  typeof updateInscripcionInputSchema
>;

export const updateInscripcionOutputSchema = inscripcionSchema
  .omit({
    eventoId: true,
    id: true,
    usuarioId: true,
  })
  .extend({
    evento: eventoSchema,
    usuario: usuarioSchema,
  });
