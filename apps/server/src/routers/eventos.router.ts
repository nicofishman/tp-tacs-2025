import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { ReplaceEventoDto } from "@/dtos/eventos/input/replace-evento.dto";
import type { UpdateEventoDto } from "@/dtos/eventos/input/update-evento.dto";
import type { Elysia } from "elysia";
import { EventosController } from "../controllers/eventos.controller";
import { handleRoute } from "./handleRoute";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: Elysia) => {
	app.get(
		RUTA_EVENTOS,
		async ({
			query,
			set,
		}: {
			query: Record<string, string | undefined>;
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const filtros = {
					dateFrom: query.dateFrom,
					dateTo: query.dateTo,
					categoriaId: query.categoriaId,
					priceMin: query.priceMin,
					priceMax: query.priceMax,
					q: query.q,
					limit: query.limit,
					page: query.page,
					orderBy: query.orderBy,
					order: query.order,
				};

				const result = await EventosController.findMany(filtros);
				set.status = 200;
				return result;
			})
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
			})
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
			})
	);

	app.post(
		RUTA_EVENTOS,
		async ({ body, set }: { body: CreateEventoDto; set: { status: number } }) =>
			handleRoute(async () => {
				const evento = await EventosController.create(body);
				set.status = 201;
				return evento;
			})
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
			})
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
			})
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
			})
	);
};
