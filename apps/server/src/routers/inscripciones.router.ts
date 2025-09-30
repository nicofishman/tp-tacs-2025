import { RolUsuario } from "@prisma/client";
import { ConflictError } from "@server/exceptions/ConflictError";
import {
  createInscripcionInputSchema,
  createInscripcionOutputSchema,
} from "@server/schemas/inscripciones/create-inscripcion.schema";
import { findAllInscripcionOutputSchema } from "@server/schemas/inscripciones/findall-inscripcion.schema";
import { findByIdInscripcionOutputSchema } from "@server/schemas/inscripciones/findById-inscripcion.schema";
import {
  updateInscripcionInputSchema,
  updateInscripcionOutputSchema,
} from "@server/schemas/inscripciones/update-inscripcion.schema";
import type { ElysiaWithLogger } from "@server/types";
import z from "zod";
import { InscripcionesController } from "../controllers/inscripciones.controller";

const RUTA_INSCRIPCIONES = "/inscripciones";

export const InscripcionesRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_INSCRIPCIONES, { tags: ["Inscripciones"] }, (app) =>
    app
      .get(
        "/",
        async ({ status }) => {
          const inscripciones = await InscripcionesController.findAll();
          return status(200, inscripciones);
        },
        {
          response: {
            200: findAllInscripcionOutputSchema,
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .get(
        "/:id",
        async ({ params, status }) => {
          const inscripcion = await InscripcionesController.findById(params.id);
          return status(200, inscripcion);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID de la inscripción"),
          }),
          response: {
            200: findByIdInscripcionOutputSchema,
            404: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .post(
        "/",
        async ({ body, status }) => {
          const inscripcion = await InscripcionesController.create(body);

          if (!inscripcion) {
            throw new ConflictError("Error al crear la inscripción");
          }
          return status(201, {
            ...inscripcion,
            evento: {
              ...inscripcion.evento,
              fechaInicio: inscripcion.evento.fechaInicio.toISOString(),
            },
            fechaRegistro: inscripcion.fechaRegistro.toISOString(),
          });
        },
        {
          body: createInscripcionInputSchema,
          response: {
            201: createInscripcionOutputSchema,
            400: z.object({ error: z.string() }),
            500: z.object({ error: z.string() }),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      )
      .patch(
        "/:id",
        async ({ params, body, status }) => {
          const inscripcion = await InscripcionesController.update(
            params.id,
            body,
          );
          return status(200, inscripcion);
        },
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
        async ({ params, status }) => {
          await InscripcionesController.delete(params.id);
          return status(204, null);
        },
        {
          params: z.object({
            id: z.string().min(1).describe("El ID de la inscripción"),
          }),
          response: {
            204: z.null(),
          },
          role: RolUsuario.ORGANIZADOR,
        },
      ),
  );
