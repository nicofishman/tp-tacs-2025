import type { Elysia } from "elysia";
import z from "zod";
import { CreateCategoriaSchema } from "@/schemas/categorias/categoria.input.schema";
import { CategoriaOutputSchema } from "@/schemas/categorias/categoria.output.schema";
import { CategoriasController } from "../controllers/categorias.controller";
import { handleRoute } from "./handleRoute";

const RUTA_CATEGORIAS = "/categorias";

export const CategoriasRouter = (app: Elysia) =>
  app.group(RUTA_CATEGORIAS, { tags: ["Categorias"] }, (app) =>
    app
      .get(
        "/",
        async ({ set }) =>
          handleRoute(async () => {
            const categorias = await CategoriasController.findAll();
            set.status = 200;
            return categorias;
          }),
        {
          response: {
            200: z.array(CategoriaOutputSchema),
          },
        },
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
          params: z.object({
            id: z.string().describe("El ID de la categoría"),
          }),
          response: {
            200: CategoriaOutputSchema,
          },
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
          body: CreateCategoriaSchema,
          response: {
            201: CategoriaOutputSchema,
          },
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
          params: z.object({
            id: z.string().describe("El ID de la categoría"),
          }),
          response: {
            204: z.null(),
          },
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
          params: z.object({
            nombre: z.string().describe("El nombre de la categoría"),
          }),
          response: {
            204: z.null(),
          },
        },
      ),
  );
