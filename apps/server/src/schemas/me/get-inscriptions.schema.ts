import z from "zod";
import { inscripcionSchema } from "../inscripciones/inscripcion.schema";

export const getMyInscriptionsOutputSchema = z.array(inscripcionSchema);

export type GetMyInscriptionsOutput = z.infer<
  typeof getMyInscriptionsOutputSchema
>;
