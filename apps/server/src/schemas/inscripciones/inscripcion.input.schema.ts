import { EstadoInscripcion } from "@prisma/client";
import { z } from "zod";

export const CreateInscripcionSchema = z.object({
  estado: z.enum(
    Object.values(EstadoInscripcion) as [
      EstadoInscripcion,
      ...EstadoInscripcion[],
    ],
    {
      error: "Estado inválido",
    },
  ),
  eventoId: z.string({
    error: "El ID de evento debe ser un string",
  }),
  fechaRegistro: z.iso
    .date({
      error: "La fecha de registro debe ser un string",
    })
    .default(() => {
      const now = new Date();
      now.setHours(now.getHours() - 3);
      return now.toISOString();
    }),
  usuarioId: z.string({
    error: "El ID de usuario debe ser un string",
  }),
});

export type CreateInscripcionDto = z.infer<typeof CreateInscripcionSchema>;

export const UpdateInscripcionSchema = z.object({
  estado: z
    .enum(
      Object.values(EstadoInscripcion) as [
        EstadoInscripcion,
        ...EstadoInscripcion[],
      ],
      {
        error: "Estado inválido",
      },
    )
    .optional(),
  fechaRegistro: z.iso
    .date({
      error: "La fecha de registro debe ser un date",
    })
    .optional(),
});

export type UpdateInscripcionDto = z.infer<typeof UpdateInscripcionSchema>;

export const IdSchema = z.string({
  error: "El ID de inscripción debe ser un string",
});
