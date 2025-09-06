import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { ReplaceEventoDto } from "@/dtos/eventos/input/replace-evento.dto";
import type { UpdateEventoDto } from "@/dtos/eventos/input/update-evento.dto";
import type { Elysia } from "elysia";
import { EventosController } from "../controllers/eventos.controller";
import { handleRoute } from "./handleRoute";

const RUTA_EVENTOS = "/eventos";

export const EventosRouter = (app: Elysia) => {
	app.get(RUTA_EVENTOS, async ({ set }: { set: { status: number } }) =>
		handleRoute(async () => {
			const eventos = await EventosController.findAll();
			set.status = 200;
			return eventos;
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
};
