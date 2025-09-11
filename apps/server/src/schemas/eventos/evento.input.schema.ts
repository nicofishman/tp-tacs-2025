import { EstadoEvento } from "@prisma/client";
import { z } from "zod";

export const DuracionSchema = z.object({
  horas: z
    .number({
      error: "Las horas son requeridas",
    })
    .int()
    .min(0, "Las horas deben ser >= 0"),
  minutos: z
    .number({
      error: "Los minutos son requeridos",
    })
    .int()
    .min(0, "Los minutos deben ser >= 0")
    .max(59, "Máximo 59 minutos"),
});

export const UbicacionSchema = z.object({
  direccion: z
    .string({
      error: "La dirección es requerida",
    })
    .min(1, "La dirección no puede estar vacía"),
  lat: z.number({
    error: "La latitud es requerida",
  }),
  lng: z.number({
    error: "La longitud es requerida",
  }),
});

export const CreateEventoSchema = z.object({
  categoriaId: z
    .string({
      error: "La categoría es requerida",
    })
    .min(1, "La categoría no puede estar vacía"),
  cupoMaximo: z
    .number({
      error: "El cupo máximo es requerido",
    })
    .int()
    .min(1, "Cupo máximo debe ser >= 1"),
  cupoMinimo: z
    .number({
      error: "El cupo mínimo es requerido",
    })
    .int()
    .min(0, "Cupo mínimo debe ser >= 0")
    .default(0),
  descripcion: z
    .string({
      error: "La descripción es requerida",
    })
    .min(1, "La descripción no puede estar vacía"),
  duracion: DuracionSchema,
  estado: z
    .enum(Object.values(EstadoEvento) as [EstadoEvento, ...EstadoEvento[]], {
      error: "El estado es requerido",
    })
    .default(EstadoEvento.PENDIENTE),
  fechaInicio: z.iso.datetime(),
  organizadorId: z
    .string({
      error: "El organizador es requerido",
    })
    .min(1, "El organizador no puede estar vacío"),
  precio: z
    .number({
      error: "El precio es requerido",
    })
    .min(0, "El precio debe ser >= 0"),
  titulo: z
    .string({
      error: "El título es requerido",
    })
    .min(1, "El título no puede estar vacío"),
  ubicacion: UbicacionSchema,
});

export type CreateEventoDto = z.infer<typeof CreateEventoSchema>;

// Por el momento es igual, pero lo dejamos separado por si en el futuro cambia
export const ReplaceEventoSchema = CreateEventoSchema;
export type ReplaceEventoDto = z.infer<typeof ReplaceEventoSchema>;

export const UpdateEventoSchema = z.object({
  categoriaId: z
    .string()
    .min(1, "La categoría no puede estar vacía")
    .optional(),
  cupoMaximo: z.number().int().min(1, "Cupo máximo debe ser >= 1").optional(),
  cupoMinimo: z.number().int().min(0, "Cupo mínimo debe ser >= 0").optional(),
  descripcion: z
    .string()
    .min(1, "La descripción no puede estar vacía")
    .optional(),
  duracion: DuracionSchema.optional(),
  estado: z
    .enum(Object.values(EstadoEvento) as [EstadoEvento, ...EstadoEvento[]], {
      error: "El estado es requerido",
    })
    .optional(),
  fechaInicio: z.iso
    .datetime()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Fecha inválida, debe ser formato ISO",
    })
    .optional(),
  organizadorId: z
    .string()
    .min(1, "El organizador no puede estar vacío")
    .optional(),
  precio: z.number().min(0, "El precio debe ser >= 0").optional(),
  titulo: z.string().min(1, "El título no puede estar vacío").optional(),
  ubicacion: UbicacionSchema.optional(),
});

export type UpdateEventoDto = z.infer<typeof UpdateEventoSchema>;

export const FindEventosQuerySchema = z.object({
  categoriaId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["fechaInicio", "precio"]).optional(),
  page: z.coerce.number().int().positive().default(1).optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
  priceMin: z.coerce.number().nonnegative().optional(),
  q: z.string().min(1).optional(),
});
export type FindEventosQuery = z.infer<typeof FindEventosQuerySchema>;

export const IdSchema = z.string({
  error: "El ID de categoría es requerido",
});
