import z from "zod";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { eventoSchema } from "./evento.schema";

export const findParticipantsEventosOutputSchema = eventoSchema
  .pick({
    id: true,
    titulo: true,
  })
  .extend({
    participantes: z.array(usuarioSchema.omit({ password: true })).optional(),
  });
