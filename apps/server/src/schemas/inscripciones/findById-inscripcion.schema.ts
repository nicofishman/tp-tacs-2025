import { EventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { InscripcionSchema } from "./inscripcion.schema";

export const findByIdInscripcionSchema = InscripcionSchema.omit({
  eventoId: true,
  id: true,
  usuarioId: true,
}).extend({
  evento: EventoSchema,
  usuario: usuarioSchema.omit({ password: true }),
});
