import z from "zod";
import { inscripcionSchema } from "../inscripciones/inscripcion.schema";

export const findEventsByUserIdUsuariosOutputSchema =
  z.array(inscripcionSchema);

export type FindEventsByUserIdUsuariosOutput = z.infer<
  typeof findEventsByUserIdUsuariosOutputSchema
>;
