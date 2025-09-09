import { type Elysia, t } from "elysia";
import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { ReplaceEventoDto } from "@/dtos/eventos/input/replace-evento.dto";
import type { UpdateEventoDto } from "@/dtos/eventos/input/update-evento.dto";
import { EventosController } from "../controllers/eventos.controller";
import { handleRoute } from "./handleRoute";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: Elysia) => {
  app.get(
    RUTA_EVENTOS,
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
      query: t.Object({
        categoriaId: t.Optional(t.String()),
        dateFrom: t.Optional(t.String()),
        dateTo: t.Optional(t.String()),
        limit: t.Optional(t.Number()),
        order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
        orderBy: t.Optional(
          t.Union([t.Literal("fechaInicio"), t.Literal("precio")]),
        ),
        page: t.Optional(t.Number()),
        priceMax: t.Optional(t.Number()),
        priceMin: t.Optional(t.Number()),
        q: t.Optional(t.String()),
      }),
    },
  );

  app.post(
    `${RUTA_EVENTOS}/:id/register`,
    async ({
      params,
      query,
      set,
    }: {
      params: { id: string };
      query: { user_id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const { id } = params;
        const { user_id } = query;

        const evento = await EventosController.registerToEvent(id, user_id);
        set.status = 200;
        return evento;
      }),
  );

  app.get(
    `${RUTA_EVENTOS}/:id/participants`,
    async ({
      params,
      set,
    }: {
      params: { id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const evento = await EventosController.findParticipantsByEvent(
          params.id,
        );
        set.status = 200;
        return evento;
      }),
  );

  app.get(
    `${RUTA_EVENTOS}/:id`,
    async ({
      params,
      set,
    }: {
      params: { id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const evento = await EventosController.findById(params.id);
        set.status = 200;
        return evento;
      }),
  );

  app.post(
    RUTA_EVENTOS,
    async ({ body, set }: { body: CreateEventoDto; set: { status: number } }) =>
      handleRoute(async () => {
        const evento = await EventosController.create(body);
        set.status = 201;
        return evento;
      }),
  );

  app.put(
    `${RUTA_EVENTOS}/:id`,
    async ({
      params,
      body,
      set,
    }: {
      params: { id: string };
      body: ReplaceEventoDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const evento = await EventosController.replace(params.id, body);
        set.status = 200;
        return evento;
      }),
  );

  app.patch(
    `${RUTA_EVENTOS}/:id`,
    async ({
      params,
      body,
      set,
    }: {
      params: { id: string };
      body: UpdateEventoDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const evento = await EventosController.update(params.id, body);
        set.status = 200;
        return evento;
      }),
  );

  app.delete(
    `${RUTA_EVENTOS}/:id`,
    async ({
      params,
      set,
    }: {
      params: { id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        await EventosController.delete(params.id);
        set.status = 204;
        return null;
      }),
  );

  app.patch(
    `${RUTA_EVENTOS}/:id/register/:userid`,
    async ({
      params,
      set,
    }: {
      params: { id: string; userid: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        await EventosController.unregisterFromEvent(params.id, params.userid);
        set.status = 204;
        return null;
      }),
  );
};
