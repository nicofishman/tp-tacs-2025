import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";
import { eventoSchema } from "../eventos/evento.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const inscripcionSchema = z.object({
  estado: z.enum(EstadoInscripcion),
  eventoId: eventoSchema.shape.id,
  fechaRegistro: z.iso.date({
    error: "La fecha de registro debe ser un string",
  }),
  id: z.string().min(1, { error: "El ID de inscripción no puede estar vacío" }),
  usuarioId: usuarioSchema.shape.id,
});
