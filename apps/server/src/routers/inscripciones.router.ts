import type { Elysia } from "elysia";
import z from "zod";
import {
  createInscripcionInputSchema,
  createInscripcionOutputSchema,
} from "@/schemas/inscripciones/create-inscripcion.schema";
import { findAllInscripcionOutputSchema } from "@/schemas/inscripciones/findall-inscripcion.schema";
import { findByIdInscripcionOutputSchema } from "@/schemas/inscripciones/findById-inscripcion.schema";
import {
  updateInscripcionInputSchema,
  updateInscripcionOutputSchema,
} from "@/schemas/inscripciones/update-inscripcion.schema";
import { InscripcionesController } from "../controllers/inscripciones.controller";
import { handleRoute } from "./handleRoute";

const RUTA_INSCRIPCIONES = "/inscripciones";

export const InscripcionesRouter = (app: Elysia) =>
  app.group(RUTA_INSCRIPCIONES, { tags: ["Inscripciones"] }, (app) =>
    app
      .get(
        "/",
        async ({ set }) =>
          handleRoute(async () => {
            const inscripciones = await InscripcionesController.findAll();
            set.status = 200;
            return inscripciones;
          }),
        {
          response: {
            200: findAllInscripcionOutputSchema,
            500: z.object({ error: z.string() }),
          },
        },
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
          params: z.object({
            id: z.string().min(1).describe("El ID de la inscripción"),
          }),
          response: {
            200: findByIdInscripcionOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
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
          body: createInscripcionInputSchema,
          response: {
            201: createInscripcionOutputSchema,
            400: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
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
          body: updateInscripcionInputSchema,
          params: z.object({
            id: z.string().min(1).describe("El ID de la inscripción"),
          }),
          response: {
            200: updateInscripcionOutputSchema,
            400: z.object({ error: z.string() }),
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
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
          params: z.object({
            id: z.string().min(1).describe("El ID de la inscripción"),
          }),
          response: {
            204: z.null(),
          },
        },
      ),
  );
