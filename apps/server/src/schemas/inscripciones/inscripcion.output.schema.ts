import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";
import { EventoOutputSchema } from "../eventos/evento.output.schema";
import { UsuarioOutputSchema } from "../usuarios/usuario.output.schema";

export const inscripcionOutputSchema = z.object({
	id: z.string().uuid(),
	usuario: UsuarioOutputSchema,
	evento: EventoOutputSchema,
	estado: z.enum(
		Object.values(EstadoInscripcion) as [
			EstadoInscripcion,
			...EstadoInscripcion[],
		],
	),
	fechaRegistro: z.string().datetime(),
});
