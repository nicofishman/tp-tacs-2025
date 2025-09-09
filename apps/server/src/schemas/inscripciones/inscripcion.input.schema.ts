import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";

export const createInscripcionSchema = z.object({
  estado: z.enum(
    Object.values(EstadoInscripcion) as [
      EstadoInscripcion,
      ...EstadoInscripcion[],
    ],
    {
      message: "Estado inválido",
    },
  ),
  eventoId: z.string({
    invalid_type_error: "El ID de evento debe ser un string",
    required_error: "El ID de evento es requerido",
  }),
  fechaRegistro: z
    .string({
      invalid_type_error: "La fecha de registro debe ser un string",
      required_error: "La fecha de registro es requerida",
    })
    .datetime({ message: "Fecha de registro inválida" })
    .default(() => {
      const now = new Date();
      now.setHours(now.getHours() - 3);
      return now.toISOString();
    }),
  usuarioId: z.string({
    invalid_type_error: "El ID de usuario debe ser un string",
    required_error: "El ID de usuario es requerido",
  }),
});

export type CreateInscripcionInput = z.infer<typeof createInscripcionSchema>;

export const updateInscripcionSchema = z.object({
  estado: z
    .enum(
      Object.values(EstadoInscripcion) as [
        EstadoInscripcion,
        ...EstadoInscripcion[],
      ],
      {
        message: "Estado inválido",
      },
    )
    .optional(),
  fechaRegistro: z
    .string({
      invalid_type_error: "La fecha de registro debe ser un string",
    })
    .datetime({ message: "Fecha de registro inválida" })
    .optional(),
});

export type UpdateInscripcionInput = z.infer<typeof updateInscripcionSchema>;

export const IdSchema = z.string({
  invalid_type_error: "El ID de inscripción debe ser un texto",
  required_error: "El ID de inscripción es requerido",
});
