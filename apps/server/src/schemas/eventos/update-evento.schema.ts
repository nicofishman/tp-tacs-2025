import type z from "zod";
import { categoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { eventoSchema } from "./evento.schema";

export const updateEventoInputSchema = eventoSchema
  .omit({
    id: true,
  })
  .partial();

export type UpdateEventoInput = z.infer<typeof updateEventoInputSchema>;

export const updateEventoOutputSchema = eventoSchema
  .omit({
    categoriaId: true,
    id: true,
    organizadorId: true,
  })
  .extend({
    categoria: categoriaSchema,
    organizador: usuarioSchema.omit({ password: true }),
  });
