import z from "zod";
import { inscripcionOutputSchema } from "@/schemas/inscripciones/inscripcion.output.schema";

export const findEventsByUserIdUsuariosOutputSchema = z.array(
  inscripcionOutputSchema,
);

export type FindEventsByUserIdUsuariosOutput = z.infer<
  typeof findEventsByUserIdUsuariosOutputSchema
>;
