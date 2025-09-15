import type z from "zod";
import { EventoSchema } from "./evento.schema";

export const updateEventoInputSchema = EventoSchema.omit({
  id: true,
}).partial();

export type UpdateEventoInput = z.infer<typeof updateEventoInputSchema>;

export const updateEventoOutputSchema = EventoSchema;

export type UpdateEventoOutput = z.infer<typeof updateEventoOutputSchema>;
