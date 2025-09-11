import type { Elysia } from "elysia";
import z from "zod";
import {
  CreateEventoSchema,
  ReplaceEventoSchema,
  UpdateEventoSchema,
} from "@/schemas/eventos/evento.input.schema";
import { EventosController } from "../controllers/eventos.controller";
import { handleRoute } from "./handleRoute";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: Elysia) =>
  app.group(RUTA_EVENTOS, (app) =>
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
            categoriaId: z.optional(z.string()),
            dateFrom: z.optional(z.string()),
            dateTo: z.optional(z.string()),
            limit: z.optional(z.number()),
            order: z.optional(z.union([z.literal("asc"), z.literal("desc")])),
            orderBy: z.optional(
              z.union([z.literal("fechaInicio"), z.literal("precio")]),
            ),
            page: z.optional(z.number()),
            priceMax: z.optional(z.number()),
            priceMin: z.optional(z.number()),
            q: z.optional(z.string()),
          }),
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
            id: z.string(),
          }),
          query: z.object({
            user_id: z.string(),
          }),
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
            id: z.string(),
          }),
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
            id: z.string(),
          }),
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
          body: CreateEventoSchema,
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
            id: z.string(),
          }),
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
            id: z.string(),
          }),
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
