import { EstadoEvento } from "@prisma/client";
import { z } from "zod";

export const DuracionSchema = z.object({
  horas: z
    .number({
      invalid_type_error: "Las horas deben ser un número",
      required_error: "Las horas son requeridas",
    })
    .int()
    .min(0, "Las horas deben ser >= 0"),
  minutos: z
    .number({
      invalid_type_error: "Los minutos deben ser un número",
      required_error: "Los minutos son requeridos",
    })
    .int()
    .min(0, "Los minutos deben ser >= 0")
    .max(59, "Máximo 59 minutos"),
});

export const UbicacionSchema = z.object({
  direccion: z
    .string({
      invalid_type_error: "La dirección debe ser un texto",
      required_error: "La dirección es requerida",
    })
    .min(1, "La dirección no puede estar vacía"),
  lat: z.number({
    invalid_type_error: "La latitud debe ser un número",
    required_error: "La latitud es requerida",
  }),
  lng: z.number({
    invalid_type_error: "La longitud debe ser un número",
    required_error: "La longitud es requerida",
  }),
});

export const CreateEventoSchema = z.object({
  categoriaId: z
    .string({
      invalid_type_error: "La categoría debe ser un texto",
      required_error: "La categoría es requerida",
    })
    .min(1, "La categoría no puede estar vacía"),
  cupoMaximo: z
    .number({
      invalid_type_error: "El cupo máximo debe ser un número",
      required_error: "El cupo máximo es requerido",
    })
    .int()
    .min(1, "Cupo máximo debe ser >= 1"),
  cupoMinimo: z
    .number({
      invalid_type_error: "El cupo mínimo debe ser un número",
    })
    .int()
    .min(0, "Cupo mínimo debe ser >= 0")
    .default(0),
  descripcion: z
    .string({
      invalid_type_error: "La descripción debe ser un texto",
      required_error: "La descripción es requerida",
    })
    .min(1, "La descripción no puede estar vacía"),
  duracion: DuracionSchema,
  estado: z
    .enum(Object.values(EstadoEvento) as [EstadoEvento, ...EstadoEvento[]], {
      invalid_type_error: "El estado debe ser uno de los valores válidos",
    })
    .default(EstadoEvento.PENDIENTE),
  fechaInicio: z
    .string({
      invalid_type_error: "La fecha de inicio debe ser un texto",
      required_error: "La fecha de inicio es requerida",
    })
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Fecha inválida, debe ser formato ISO",
    }),
  organizadorId: z
    .string({
      invalid_type_error: "El organizador debe ser un texto",
      required_error: "El organizador es requerido",
    })
    .min(1, "El organizador no puede estar vacío"),
  precio: z
    .number({
      invalid_type_error: "El precio debe ser un número",
      required_error: "El precio es requerido",
    })
    .min(0, "El precio debe ser >= 0"),
  titulo: z
    .string({
      invalid_type_error: "El título debe ser un texto",
      required_error: "El título es requerido",
    })
    .min(1, "El título no puede estar vacío"),
  ubicacion: UbicacionSchema,
});

export type CreateEventoInput = z.infer<typeof CreateEventoSchema>;

// Por el momento es igual, pero lo dejamos separado por si en el futuro cambia
export const ReplaceEventoSchema = CreateEventoSchema;
export type ReplaceEventoInput = z.infer<typeof ReplaceEventoSchema>;

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
      invalid_type_error: "El estado debe ser uno de los valores válidos",
    })
    .optional(),
  fechaInicio: z
    .string()
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

export type UpdateEventoInput = z.infer<typeof UpdateEventoSchema>;

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
  invalid_type_error: "El ID de categoría debe ser un texto",
  required_error: "El ID de categoría es requerido",
});
