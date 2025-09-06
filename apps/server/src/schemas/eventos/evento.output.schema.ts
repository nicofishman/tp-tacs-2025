import { CategoriaOutputSchema } from "@/schemas/categorias/categoria.output.schema";
import { UsuarioOutputSchema } from "@/schemas/usuarios/usuario.output.schema";
import { z } from "zod";

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
	id: z.string(),
	titulo: z.string(),
	descripcion: z.string(),
	fechaInicio: z.string(),
	duracion: DuracionOutputSchema,
	ubicacion: UbicacionOutputSchema,
	cupoMaximo: z.number().int().min(1),
	cupoMinimo: z.number().int().min(0).optional(),
	precio: z.number().min(0),
	categoria: CategoriaOutputSchema,
	estado: z.string(),
	organizador: UsuarioOutputSchema,
});

export function mapEventoToOutput(evento: unknown) {
	return EventoOutputSchema.parse(evento);
}
