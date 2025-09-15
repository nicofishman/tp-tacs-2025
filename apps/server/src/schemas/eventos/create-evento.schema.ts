import z from "zod";
import { CategoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";
import { EventoSchema } from "./evento.schema";

export const createEventoInputSchema = EventoSchema.omit({ id: true });

export type CreateEventoInput = z.infer<typeof createEventoInputSchema>;

export const createEventoOutputSchema = EventoSchema.omit({ id: true }).extend({
  categorias: z.array(CategoriaSchema),
  organizador: usuarioSchema.omit({ password: true }),
});
