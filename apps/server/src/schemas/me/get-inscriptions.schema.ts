import z from "zod";
import { categoriaSchema } from "../categorias/categoria.schema";
import { eventoSchema } from "../eventos/evento.schema";
import { inscripcionSchema } from "../inscripciones/inscripcion.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const getMyInscriptionsOutputSchema = z.array(
  inscripcionSchema.extend({
    evento: eventoSchema.extend({
      categoria: categoriaSchema,
      organizador: usuarioSchema,
    }),
  }),
);

export type GetMyInscriptionsOutput = z.infer<
  typeof getMyInscriptionsOutputSchema
>;
