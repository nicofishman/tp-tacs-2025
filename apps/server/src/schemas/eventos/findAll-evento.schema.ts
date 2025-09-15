import { z } from "zod";
import { EventoSchema } from "./evento.schema";

export const findAllEventoQuerySchema = z.object({
  categoriaId: z.optional(z.string()).describe("El ID de la categoría"),
  dateFrom: z.optional(z.string()).describe("La fecha de inicio"),
  dateTo: z.optional(z.string()).describe("La fecha de fin"),
  limit: z.optional(z.number()).describe("El límite de eventos"),
  order: z
    .optional(z.union([z.literal("asc"), z.literal("desc")]))
    .describe("El orden de los eventos"),
  orderBy: z
    .optional(z.union([z.literal("fechaInicio"), z.literal("precio")]))
    .describe("El campo por el que se ordenará los eventos"),
  page: z.optional(z.number()).describe("La página de los eventos"),
  priceMax: z.optional(z.number()).describe("El precio máximo de los eventos"),
  priceMin: z.optional(z.number()).describe("El precio mínimo de los eventos"),
  q: z.optional(z.string()).describe("La consulta de los eventos"),
});

export type FindAllEventoQuery = z.infer<typeof findAllEventoQuerySchema>;

export const findAllEventoOutputSchema = z.array(EventoSchema);
