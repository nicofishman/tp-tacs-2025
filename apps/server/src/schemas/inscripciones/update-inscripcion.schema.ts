import type z from "zod";
import { EventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { InscripcionSchema } from "./inscripcion.schema";

export const updateInscripcionInputSchema = InscripcionSchema.omit({
  id: true,
}).partial();

export type updateInscripcionInput = z.infer<
  typeof updateInscripcionInputSchema
>;

export const updateInscripcionOutputSchema = InscripcionSchema.omit({
  eventoId: true,
  id: true,
  usuarioId: true,
}).extend({
  evento: EventoSchema,
  usuario: usuarioSchema.omit({ password: true }),
});
