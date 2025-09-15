import { categoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { eventoSchema } from "./evento.schema";

export const findByIdEventoOutputSchema = eventoSchema
  .omit({
    categoriaId: true,
    id: true,
    organizadorId: true,
  })
  .extend({
    categoria: categoriaSchema,
    organizador: usuarioSchema.omit({ password: true }),
  });
