import type { Elysia } from "elysia";
import z from "zod";
import {
  CreateInscripcionSchema,
  UpdateInscripcionSchema,
} from "@/schemas/inscripciones/inscripcion.input.schema";
import { inscripcionOutputSchema as InscripcionOutputSchema } from "@/schemas/inscripciones/inscripcion.output.schema";
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
            200: z.array(InscripcionOutputSchema),
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
            id: z.string().describe("El ID de la inscripción"),
          }),
          response: {
            200: InscripcionOutputSchema,
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
          body: CreateInscripcionSchema,
          response: {
            201: InscripcionOutputSchema,
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
          body: UpdateInscripcionSchema,
          params: z.object({
            id: z.string().describe("El ID de la inscripción"),
          }),
          response: {
            200: InscripcionOutputSchema,
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
            id: z.string().describe("El ID de la inscripción"),
          }),
          response: {
            204: z.null(),
          },
        },
      ),
  );
