import { CategoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { EventoSchema } from "./evento.schema";

export const findByIdEventoSchema = EventoSchema.omit({
  categoriaId: true,
  id: true,
  organizadorId: true,
}).extend({
  categoria: CategoriaSchema,
  organizador: usuarioSchema.omit({ password: true }),
});
