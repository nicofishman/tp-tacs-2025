import { TypeBoxFromZod } from "@sinclair/typemap";
import type { Elysia } from "elysia";
import z from "zod";
import { CreateCategoriaSchema } from "@/schemas/categorias/categoria.input.schema";
import { CategoriasController } from "../controllers/categorias.controller";
import { handleRoute } from "./handleRoute";

const RUTA_CATEGORIAS = "/categorias";

export const CategoriasRouter = (app: Elysia) =>
  app.group(RUTA_CATEGORIAS, (app) =>
    app
      .get("/", async ({ set }) =>
        handleRoute(async () => {
          const categorias = await CategoriasController.findAll();
          set.status = 200;
          return categorias;
        }),
      )
      .get(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            const categoria = await CategoriasController.findById(params.id);
            set.status = 200;
            return categoria;
          }),
        {
          params: TypeBoxFromZod(
            z.object({
              id: z.string(),
            }),
          ),
        },
      )
      .post(
        "/",
        async ({ body, set }) =>
          handleRoute(async () => {
            const nuevaCategoria = await CategoriasController.create(body);
            set.status = 201;
            return nuevaCategoria;
          }),
        {
          body: TypeBoxFromZod(CreateCategoriaSchema),
        },
      )
      .delete(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            await CategoriasController.delete(params.id);
            set.status = 204;
            return null;
          }),
        {
          params: TypeBoxFromZod(
            z.object({
              id: z.string(),
            }),
          ),
        },
      )
      .delete(
        "/nombres/:nombre",
        async ({ params, set }) =>
          handleRoute(async () => {
            await CategoriasController.deleteByName(params.nombre);
            set.status = 204;
            return null;
          }),
        {
          params: TypeBoxFromZod(
            z.object({
              nombre: z.string(),
            }),
          ),
        },
      ),
  );
