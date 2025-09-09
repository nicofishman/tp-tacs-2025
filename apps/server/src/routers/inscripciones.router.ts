import { TypeBoxFromZod } from "@sinclair/typemap";
import type { Elysia } from "elysia";
import z from "zod";
import {
  CreateInscripcionSchema,
  UpdateInscripcionSchema,
} from "@/schemas/inscripciones/inscripcion.input.schema";
import { InscripcionesController } from "../controllers/inscripciones.controller";
import { handleRoute } from "./handleRoute";

const RUTA_INSCRIPCIONES = "/inscripciones";

export const InscripcionesRouter = (app: Elysia) =>
  app.group(RUTA_INSCRIPCIONES, (app) =>
    app
      .get("/", async ({ set }) =>
        handleRoute(async () => {
          const inscripciones = await InscripcionesController.findAll();
          set.status = 200;
          return inscripciones;
        }),
      )
      .get(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            const inscripcion = await InscripcionesController.findById(
              params.id,
            );
            set.status = 200;
            return inscripcion;
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
            const inscripcion = await InscripcionesController.create(body);
            set.status = 201;
            return inscripcion;
          }),
        {
          body: TypeBoxFromZod(CreateInscripcionSchema),
        },
      )
      .patch(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const inscripcion = await InscripcionesController.update(
              params.id,
              body,
            );
            set.status = 200;
            return inscripcion;
          }),
        {
          body: TypeBoxFromZod(UpdateInscripcionSchema),
          params: TypeBoxFromZod(
            z.object({
              id: z.string(),
            }),
          ),
        },
      )
      .delete(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            await InscripcionesController.delete(params.id);
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
      ),
  );
