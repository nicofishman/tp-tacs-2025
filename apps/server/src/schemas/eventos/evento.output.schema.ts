import { z } from "zod";
import { CategoriaOutputSchema } from "@/schemas/categorias/categoria.output.schema";
import { UsuarioOutputSchema } from "@/schemas/usuarios/usuario.output.schema";

export const DuracionOutputSchema = z.object({
  horas: z.number().int().min(0),
  minutos: z.number().int().min(0).max(59),
});

export const UbicacionOutputSchema = z.object({
  direccion: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});

export const EventoOutputSchema = z.object({
  categoria: CategoriaOutputSchema,
  cupoMaximo: z.number().int().min(1),
  cupoMinimo: z.number().int().min(0).nullable(),
  descripcion: z.string(),
  duracion: DuracionOutputSchema,
  estado: z.string(),
  fechaInicio: z.iso.datetime(),
  id: z.string(),
  organizador: UsuarioOutputSchema,
  precio: z.number().min(0),
  titulo: z.string(),
  ubicacion: UbicacionOutputSchema,
});

export function mapEventoToOutput(evento: unknown) {
  return EventoOutputSchema.parse(evento);
}
