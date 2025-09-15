import type z from "zod";
import { CategoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { EventoSchema } from "./evento.schema";

export const createEventoInputSchema = EventoSchema.omit({ id: true });

export type CreateEventoInput = z.infer<typeof createEventoInputSchema>;

export const createEventoOutputSchema = EventoSchema.omit({
  categoriaId: true,
  id: true,
  organizadorId: true,
}).extend({
  categoria: CategoriaSchema,
  organizador: usuarioSchema.omit({ password: true }),
});
