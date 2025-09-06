import type { CreateCategoriaDto } from "@/dtos/categorias/input/create-categoria.dto";
import type { Elysia } from "elysia";
import { CategoriasController } from "../controllers/categorias.controller";
import { handleRoute } from "./handleRoute";

const RUTA_CATEGORIAS = "/categorias";

export const CategoriasRouter = (app: Elysia) => {
	app.get(RUTA_CATEGORIAS, async ({ set }: { set: { status: number } }) =>
		handleRoute(async () => {
			const categorias = await CategoriasController.findAll();
			set.status = 200;
			return categorias;
		}),
	);

	app.get(
		`${RUTA_CATEGORIAS}/:id`,
		async ({
			params,
			set,
		}: {
			params: { id: string };
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const categoria = await CategoriasController.findById(params.id);
				set.status = 200;
				return categoria;
			}),
	);

	app.post(
		RUTA_CATEGORIAS,
		async ({
			body,
			set,
		}: {
			body: CreateCategoriaDto;
			set: { status: number };
		}) =>
			handleRoute(async () => {
				const nuevaCategoria = await CategoriasController.create(body);
				set.status = 201;
				return nuevaCategoria;
			}),
	);

	app.delete(
		`${RUTA_CATEGORIAS}/:id`,
		async ({
			params,
			set,
		}: {
			params: { id: string };
			set: { status: number };
		}) =>
			handleRoute(async () => {
				await CategoriasController.delete(params.id);
				set.status = 204;
				return null;
			}),
	);
};
