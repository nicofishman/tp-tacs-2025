import {
  createEventoInputSchema,
  createEventoOutputSchema,
} from "@server/schemas/eventos/create-evento.schema";
import {
  findAllEventoOutputSchema,
  findAllEventoQuerySchema,
} from "@server/schemas/eventos/findAll-evento.schema";
import { findByIdEventoOutputSchema } from "@server/schemas/eventos/findById-evento.schema";
import { findParticipantsEventosOutputSchema } from "@server/schemas/eventos/findParticipants-eventos.schema";
import { registerEventoOutputSchema } from "@server/schemas/eventos/register-evento.schema";
import {
  updateEventoInputSchema,
  updateEventoOutputSchema,
} from "@server/schemas/eventos/update-evento.schema";
import type { Elysia } from "elysia";
import z from "zod";
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
            const result = await EventosController.findAll(query);
            set.status = 200;
            return result;
          }),
        {
          query: findAllEventoQuerySchema,
          response: {
            200: z.object({
              count: z.number(),
              items: findAllEventoOutputSchema,
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
            id: z.string().min(1).describe("El ID del evento"),
          }),
          query: z.object({
            user_id: z.string().min(1).describe("El ID del usuario"),
          }),
          response: {
            200: registerEventoOutputSchema,
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      )
      .get(
        "/:id/participants",
        async ({ params, set }) =>
          handleRoute(async () => {
            const eventoConParticipantes =
              await EventosController.findParticipantsByEvent(params.id);
            set.status = 200;
            return eventoConParticipantes;
          }),
        {
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: findParticipantsEventosOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: findByIdEventoOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
      .patch(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const evento = await EventosController.update(params.id, body);
            set.status = 200;
            return evento;
          }),
        {
          body: updateEventoInputSchema,
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: updateEventoOutputSchema,
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
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
            id: z.string().min(1).describe("El ID del evento"),
            userid: z.string().min(1).describe("El ID del usuario"),
          }),
          response: {
            204: z.null(),
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      ),
  );
