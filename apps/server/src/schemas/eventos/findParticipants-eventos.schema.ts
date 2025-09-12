import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const findParticipantsEventosOutputSchema = z.array(usuarioSchema);

export type FindParticipantsEventosOutput = z.infer<
  typeof findParticipantsEventosOutputSchema
>;
