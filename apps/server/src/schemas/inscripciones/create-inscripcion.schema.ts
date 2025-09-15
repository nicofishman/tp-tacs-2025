import type z from "zod";
import { EventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { InscripcionSchema } from "./inscripcion.schema";

export const createInscripcionInputSchema = InscripcionSchema.omit({
  id: true,
});

export type CreateInscripcionInput = z.infer<
  typeof createInscripcionInputSchema
>;

export const createInscripcionOutputSchema = InscripcionSchema.omit({
  eventoId: true,
  id: true,
  usuarioId: true,
}).extend({
  evento: EventoSchema,
  usuario: usuarioSchema.omit({ password: true }),
});
