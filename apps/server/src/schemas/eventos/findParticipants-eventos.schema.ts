import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { EventoSchema } from "./evento.schema";

export const findParticipantsEventosOutputSchema = EventoSchema.pick({
  id: true,
  titulo: true,
}).extend({
  participants: z.array(usuarioSchema.omit({ password: true })).optional(),
});

export type FindParticipantsEventosOutput = z.infer<
  typeof findParticipantsEventosOutputSchema
>;
