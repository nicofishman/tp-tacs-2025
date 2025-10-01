import z from "zod";
import { eventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { inscripcionSchema } from "./inscripcion.schema";

export const findAllInscripcionOutputSchema = z.array(
  inscripcionSchema.extend({
    evento: eventoSchema,
    usuario: usuarioSchema,
  }),
);

export type FindAllInscripcionOutput = z.infer<
  typeof findAllInscripcionOutputSchema
>;
