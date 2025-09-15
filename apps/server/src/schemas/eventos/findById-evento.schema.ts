import type z from "zod";
import { EventoSchema } from "./evento.schema";

export const findByIdEventoSchema = EventoSchema;
export type findByIdEventoOutput = z.infer<typeof findByIdEventoSchema>;
