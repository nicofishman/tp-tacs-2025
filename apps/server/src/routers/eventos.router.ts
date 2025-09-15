import type { Elysia } from "elysia";
import z from "zod";
import {
  createEventoInputSchema,
  createEventoOutputSchema,
} from "@/schemas/eventos/create-evento.schema";
import { UpdateEventoSchema } from "@/schemas/eventos/evento.input.schema";
import { EventoOutputSchema } from "@/schemas/eventos/evento.output.schema";
import {
  findAllEventoOutputSchema,
  findAllEventoQuerySchema,
} from "@/schemas/eventos/findAll-evento.schema";
import { findByIdEventoSchema } from "@/schemas/eventos/findById-evento.schema";
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
            id: z.string().describe("El ID del evento"),
          }),
          query: z.object({
            user_id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: InscripcionOutputSchema,
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
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
            200: findByIdEventoSchema,
            404: z.object({ error: z.string() }),
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
