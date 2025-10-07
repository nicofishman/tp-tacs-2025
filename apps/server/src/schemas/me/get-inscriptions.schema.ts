import z from "zod";
import { eventoSchema } from "../eventos/evento.schema";
import { inscripcionSchema } from "../inscripciones/inscripcion.schema";

export const getMyInscriptionsOutputSchema = z.array(
  inscripcionSchema.extend({
    evento: eventoSchema,
  }),
);

export type GetMyInscriptionsOutput = z.infer<
  typeof getMyInscriptionsOutputSchema
>;
