import type { Elysia } from "elysia";
import { InscripcionesController } from "../controllers/inscripciones.controller";
import type { CreateInscripcionDto } from "../dtos/inscripciones/input/create-inscripcion.dto";
import type { UpdateInscripcionDto } from "../dtos/inscripciones/input/update-inscripcion.dto";
import { handleRoute } from "./handleRoute";

const RUTA_INSCRIPCIONES = "/inscripciones";

export const InscripcionesRouter = (app: Elysia) => {
	app.get(RUTA_INSCRIPCIONES, async ({ set }: { set: { status: number } }) =>
		handleRoute(async () => {
			const inscripciones = await InscripcionesController.findAll();
			set.status = 200;
			return inscripciones;
		}),
	);

	app.get(
		`${RUTA_INSCRIPCIONES}/:id`,
		async ({
			params,
			set,
		}: {
			params: { id: string };
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const inscripcion = await InscripcionesController.findById(params.id);
				set.status = 200;
				return inscripcion;
			}),
	);

	app.post(
		RUTA_INSCRIPCIONES,
		async ({
			body,
			set,
		}: {
			body: CreateInscripcionDto;
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const inscripcion = await InscripcionesController.create(body);
				set.status = 201;
				return inscripcion;
			}),
	);

	app.patch(
		`${RUTA_INSCRIPCIONES}/:id`,
		async ({
			params,
			body,
			set,
		}: {
			params: { id: string };
			body: UpdateInscripcionDto;
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const inscripcion = await InscripcionesController.update(
					params.id,
					body,
				);
				set.status = 200;
				return inscripcion;
			}),
	);

	app.delete(
		`${RUTA_INSCRIPCIONES}/:id`,
		async ({
			params,
			set,
		}: {
			params: { id: string };
			set: { status: number };
		}) =>
			handleRoute(async () => {
				await InscripcionesController.delete(params.id);
				set.status = 204;
				return null;
			}),
	);
};
