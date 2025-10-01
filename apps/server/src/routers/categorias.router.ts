import { RolUsuario } from "@prisma/client";
import {
  createCategoriaOutputSchema,
  createCategoriaSchema,
} from "@server/schemas/categorias/create-categoria.schema";
import { findAllCategoriaOutputSchema } from "@server/schemas/categorias/findAll-categoria.schema";
import { findByIdCategoriaOutputSchema } from "@server/schemas/categorias/findById-categoria.schema";
import type { ElysiaWithLogger } from "@server/types";
import z from "zod";
import { CategoriasController } from "../controllers/categorias.controller";

const RUTA_CATEGORIAS = "/categorias";

export const CategoriasRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_CATEGORIAS, { tags: ["Categorias"] }, (app) =>
    app
      .get(
        "/",
        async ({ status }) => {
          const categorias = await CategoriasController.findAll();
          return status(200, categorias);
        },
        {
          response: {
            200: findAllCategoriaOutputSchema,
            500: z.object({ error: z.string() }),
          },
        },
      )
      .get(
        "/:id",
        async ({ params, status }) => {
          const categoria = await CategoriasController.findById(params.id);
          return status(200, categoria);
        },
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
        async ({ body, status }) => {
          const nuevaCategoria = await CategoriasController.create(body);
          return status(201, nuevaCategoria);
        },
        {
          body: createCategoriaSchema,
          response: {
            201: createCategoriaOutputSchema,
            409: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .delete(
        "/:id",
        async ({ params, status }) => {
          await CategoriasController.delete(params.id);
          return status(204, null);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID de la categoría"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .delete(
        "/nombres/:nombre",
        async ({ params, status }) => {
          await CategoriasController.deleteByName(params.nombre);
          return status(204, null);
        },
        {
          params: z.object({
            nombre: z.string().min(1).describe("El nombre de la categoría"),
          }),
          response: {
            204: z.null(),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      ),
  );
