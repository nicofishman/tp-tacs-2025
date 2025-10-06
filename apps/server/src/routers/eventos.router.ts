import { RolUsuario } from "@prisma/client";
import { ConflictError } from "@server/exceptions/ConflictError";
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
import { inscripcionSchema } from "@server/schemas/inscripciones/inscripcion.schema";
import type { ElysiaWithLogger } from "@server/types";
import z from "zod";
import { EventosController } from "../controllers/eventos.controller";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_EVENTOS, { tags: ["Eventos"] }, (app) =>
    app
      .get(
        "/",
        async ({ query, status }) => {
          const result = await EventosController.findAll(query);
          return status(200, result);
        },
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
        async ({ params, user, status }) => {
          const { id } = params;

          const evento = await EventosController.registerToEvent(id, user.id);

          const resFechaRegistro = inscripcionSchema.shape.fechaRegistro.parse(
            evento.fechaRegistro,
          );
          return status(200, {
            ...evento,
            fechaRegistro: resFechaRegistro,
          });
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: registerEventoOutputSchema,
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: [RolUsuario.PARTICIPANTE, RolUsuario.ORGANIZADOR],
        },
      )
      .get(
        "/:id/participants",
        async ({ params, status }) => {
          const eventoConParticipantes =
            await EventosController.findParticipantsByEvent(params.id);
          return status(200, eventoConParticipantes);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: findParticipantsEventosOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .get(
        "/:id",
        async ({ params, status }) => {
          const evento = await EventosController.findById(params.id);
          return status(200, evento);
        },
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
        async ({ body, status, user }) => {
          const evento = await EventosController.create(user.id, body);
          if (!evento) {
            throw new ConflictError("Error al crear el evento");
          }
          // biome-ignore lint/correctness/noUnusedVariables: no se usan
          const { createdAt, updatedAt, ...eventoWithoutDates } = evento;
          return status(201, {
            ...eventoWithoutDates,
            fechaInicio: evento.fechaInicio.toISOString(),
          });
        },
        {
          body: createEventoInputSchema,
          response: {
            201: createEventoOutputSchema,
            400: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .patch(
        "/:id",
        async ({ params, body, status }) => {
          const evento = await EventosController.update(params.id, body);
          return status(200, evento);
        },
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
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .delete(
        "/:id",
        async ({ params, status }) => {
          await EventosController.delete(params.id);
          return status(204, null);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .post(
        "/:id/unregister/",
        async ({ params, status, user }) => {
          const response = await EventosController.unregisterFromEvent(
            params.id,
            user.id,
          );
          console.log(response);
          return status(200, response);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID del evento"),
          }),
          response: {
            200: z.object({ message: z.string() }),
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: [RolUsuario.PARTICIPANTE, RolUsuario.ORGANIZADOR],
        },
      ),
  );
