import { EstadoEvento } from "@prisma/client";
import { z } from "zod";
import { categoriaSchema } from "../categorias/categoria.schema";
import { usuarioSchema } from "../usuarios/usuario.schema";

export const duracionSchema = z.object({
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

export const ubicacionSchema = z.object({
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

export const eventoSchema = z.object({
  categoriaId: categoriaSchema.shape.id,
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
  duracion: duracionSchema,
  estado: z.enum(EstadoEvento).default(EstadoEvento.PENDIENTE),
  fechaInicio: z.iso.datetime({
    error: "La fecha de inicio es requerida",
  }),
  id: z.string().min(1, "El id de evento no puede estar vacío"),
  organizadorId: usuarioSchema.shape.id,
  precio: z.number({
    error: "El precio es requerido",
  }),
  titulo: z
    .string({
      error: "El título es requerido",
    })
    .min(1, "El título no puede estar vacío"),
  ubicacion: ubicacionSchema,
});
