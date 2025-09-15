import type z from "zod";
import { CategoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { EventoSchema } from "./evento.schema";

export const updateEventoInputSchema = EventoSchema.omit({
  id: true,
}).partial();

export type UpdateEventoInput = z.infer<typeof updateEventoInputSchema>;

export const updateEventoOutputSchema = EventoSchema.omit({
  categoriaId: true,
  id: true,
  organizadorId: true,
}).extend({
  categoria: CategoriaSchema,
  organizador: usuarioSchema.omit({ password: true }),
});
