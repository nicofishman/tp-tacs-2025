import z from "zod";
import { EventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { InscripcionSchema } from "./inscripcion.schema";

export const findAllInscripcionOutputSchema = z.array(
  InscripcionSchema.extend({
    evento: EventoSchema,
    usuario: usuarioSchema.omit({ password: true }),
  }),
);

export type FindAllInscripcionOutput = z.infer<
  typeof findAllInscripcionOutputSchema
>;
