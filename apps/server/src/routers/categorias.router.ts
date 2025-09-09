import { TypeBoxFromZod } from "@sinclair/typemap";
import type { Elysia } from "elysia";
import z from "zod";
import { CreateCategoriaSchema } from "@/schemas/categorias/categoria.input.schema";
import { CategoriasController } from "../controllers/categorias.controller";
import { handleRoute } from "./handleRoute";

const RUTA_CATEGORIAS = "/categorias";

export const CategoriasRouter = (app: Elysia) => {
  app.get(RUTA_CATEGORIAS, async ({ set }) =>
    handleRoute(async () => {
      const categorias = await CategoriasController.findAll();
      set.status = 200;
      return categorias;
    }),
  );

  app.get(
    `${RUTA_CATEGORIAS}/:id`,
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
  );

  app.post(
    RUTA_CATEGORIAS,
    async ({ body, set }) =>
      handleRoute(async () => {
        const nuevaCategoria = await CategoriasController.create(body);
        set.status = 201;
        return nuevaCategoria;
      }),
    {
      body: TypeBoxFromZod(CreateCategoriaSchema),
    },
  );

  app.delete(
    `${RUTA_CATEGORIAS}/:id`,
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
  );
};
