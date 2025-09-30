import { eventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { inscripcionSchema } from "./inscripcion.schema";

export const findByIdInscripcionOutputSchema = inscripcionSchema
  .omit({
    eventoId: true,
    id: true,
    usuarioId: true,
  })
  .extend({
    evento: eventoSchema,
    usuario: usuarioSchema,
  });
