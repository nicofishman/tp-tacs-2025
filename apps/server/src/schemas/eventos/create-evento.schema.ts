import type z from "zod";
import { categoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { eventoSchema } from "./evento.schema";

export const createEventoInputSchema = eventoSchema.omit({ id: true });

export type CreateEventoInput = z.infer<typeof createEventoInputSchema>;

export const createEventoOutputSchema = eventoSchema.extend({
  categoria: categoriaSchema,
  organizador: usuarioSchema.omit({ password: true }),
});
