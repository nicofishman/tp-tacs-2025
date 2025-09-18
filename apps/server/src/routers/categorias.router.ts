import {
  createCategoriaOutputSchema,
  createCategoriaSchema,
} from "@server/schemas/categorias/create-categoria.schema";
import { findAllCategoriaOutputSchema } from "@server/schemas/categorias/findAll-categoria.schema";
import { findByIdCategoriaOutputSchema } from "@server/schemas/categorias/findById-categoria.schema";
import type { Elysia } from "elysia";
import z from "zod";
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
            200: findAllCategoriaOutputSchema,
            500: z.object({ error: z.string() }),
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
            id: z.string().min(1).describe("El ID de la categoría"),
          }),
          response: {
            200: findByIdCategoriaOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
          body: createCategoriaSchema,
          response: {
            201: createCategoriaOutputSchema,
            409: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
            id: z.string().min(1).describe("El ID de la categoría"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
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
            nombre: z.string().min(1).describe("El nombre de la categoría"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      ),
  );
