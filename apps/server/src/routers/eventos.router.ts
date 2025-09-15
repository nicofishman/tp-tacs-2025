import type { Elysia } from "elysia";
import z from "zod";
import {
  createEventoInputSchema,
  createEventoOutputSchema,
} from "@/schemas/eventos/create-evento.schema";
import {
  ReplaceEventoSchema,
  UpdateEventoSchema,
} from "@/schemas/eventos/evento.input.schema";
import { EventoOutputSchema } from "@/schemas/eventos/evento.output.schema";
import { findParticipantsEventosOutputSchema } from "@/schemas/eventos/findParticipants-eventos.schema";
import { inscripcionOutputSchema as InscripcionOutputSchema } from "@/schemas/inscripciones/inscripcion.output.schema";
import { EventosController } from "../controllers/eventos.controller";
import { handleRoute } from "./handleRoute";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: Elysia) =>
  app.group(RUTA_EVENTOS, { tags: ["Eventos"] }, (app) =>
    app
      .get(
        "/",
        async ({ query, set }) =>
          handleRoute(async () => {
            const filtros = {
              categoriaId: query.categoriaId,
              dateFrom: query.dateFrom,
              dateTo: query.dateTo,
              limit: query.limit,
              order: query.order,
              orderBy: query.orderBy,
              page: query.page,
              priceMax: query.priceMax,
              priceMin: query.priceMin,
              q: query.q,
            };

            const result = await EventosController.findMany(filtros);
            set.status = 200;
            return result;
          }),
        {
          query: z.object({
            categoriaId: z
              .optional(z.string())
              .describe("El ID de la categoría"),
            dateFrom: z.optional(z.string()).describe("La fecha de inicio"),
            dateTo: z.optional(z.string()).describe("La fecha de fin"),
            limit: z.optional(z.number()).describe("El límite de eventos"),
            order: z
              .optional(z.union([z.literal("asc"), z.literal("desc")]))
              .describe("El orden de los eventos"),
            orderBy: z
              .optional(
                z.union([z.literal("fechaInicio"), z.literal("precio")]),
              )
              .describe("El campo por el que se ordenará los eventos"),
            page: z.optional(z.number()).describe("La página de los eventos"),
            priceMax: z
              .optional(z.number())
              .describe("El precio máximo de los eventos"),
            priceMin: z
              .optional(z.number())
              .describe("El precio mínimo de los eventos"),
            q: z.optional(z.string()).describe("La consulta de los eventos"),
          }),
          response: {
            200: z.object({
              count: z.number(),
              items: z.array(EventoOutputSchema),
              limit: z.number(),
              page: z.number(),
            }),
          },
        },
      )
      .post(
        "/:id/register",
        async ({ params, query, set }) =>
          handleRoute(async () => {
            const { id } = params;
            const { user_id } = query;

            const evento = await EventosController.registerToEvent(id, user_id);
            set.status = 200;
            return evento;
          }),
        {
          params: z.object({
            id: z.string().describe("El ID del evento"),
          }),
          query: z.object({
            user_id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: InscripcionOutputSchema,
          },
        },
      )
      .get(
        "/:id/participants",
        async ({ params, set }) =>
          handleRoute(async () => {
            const participantes =
              await EventosController.findParticipantsByEvent(params.id);
            set.status = 200;
            return participantes;
          }),
        {
          params: z.object({
            id: z.string().describe("El ID del evento"),
          }),
          response: {
            200: findParticipantsEventosOutputSchema,
          },
        },
      )
      .get(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            const evento = await EventosController.findById(params.id);
            set.status = 200;
            return evento;
          }),
        {
          params: z.object({
            id: z.string().describe("El ID del evento"),
          }),
          response: {
            200: EventoOutputSchema,
          },
        },
      )
      .post(
        "/",
        async ({ body, set }) =>
          handleRoute(async () => {
            const evento = await EventosController.create(body);
            set.status = 201;
            return evento;
          }),
        {
          body: createEventoInputSchema,
          response: {
            201: createEventoOutputSchema,
            400: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      )
      .put(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const evento = await EventosController.replace(params.id, body);
            set.status = 200;
            return evento;
          }),
        {
          body: ReplaceEventoSchema,
          params: z.object({
            id: z.string().describe("El ID del evento"),
          }),
          response: {
            200: EventoOutputSchema,
          },
        },
      )
      .patch(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const evento = await EventosController.update(params.id, body);
            set.status = 200;
            return evento;
          }),
        {
          body: UpdateEventoSchema,
          params: z.object({
            id: z.string().describe("El ID del evento"),
          }),
          response: {
            200: EventoOutputSchema,
          },
        },
      )
      .delete(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            await EventosController.delete(params.id);
            set.status = 204;
            return null;
          }),
        {
          params: z.object({
            id: z.string(),
          }),
        },
      )
      .patch(
        "/:id/register/:userid",
        async ({ params, set }) =>
          handleRoute(async () => {
            await EventosController.unregisterFromEvent(
              params.id,
              params.userid,
            );
            set.status = 204;
            return null;
          }),
        {
          params: z.object({
            id: z.string(),
            userid: z.string(),
          }),
        },
      ),
  );
