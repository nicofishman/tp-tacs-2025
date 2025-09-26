import {
  createUsuarioInputSchema,
  createUsuarioOutputSchema,
} from "@server/schemas/usuarios/create-usuario.schema";
import { findAllUsuariosOutputSchema } from "@server/schemas/usuarios/findAll-usuarios.schema";
import { findByIdUsuariosOutputSchema } from "@server/schemas/usuarios/findById-usuarios.schema";
import { findEventsByUserIdUsuariosOutputSchema } from "@server/schemas/usuarios/findEventsByUserId-usuarios.schema";
import {
  updateUsuarioInputSchema,
  updateUsuarioOutputSchema,
} from "@server/schemas/usuarios/update-usuario.schema";
import type { Elysia } from "elysia";
import z from "zod";
import { UsuariosController } from "../controllers/usuarios.controller";

const RUTA_USUARIOS = "/usuarios";

export const UsuariosRouter = (app: Elysia) =>
  app.group(RUTA_USUARIOS, { tags: ["Usuarios"] }, (app) =>
    app
      .get(
        "/",
        async ({ status }) => {
          const usuarios = await UsuariosController.findAll();
          return status(200, usuarios);
        },
        {
          response: {
            200: findAllUsuariosOutputSchema,
          },
        },
      )
      .get(
        "/:id",
        async ({ params, status }) => {
          const usuario = await UsuariosController.findById(params.id);
          return status(200, usuario);
        },
        {
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: findByIdUsuariosOutputSchema,
          },
        },
      )
      .get(
        "/:id/events",
        async ({ params, status }) => {
          const eventos = await UsuariosController.findEventsByUserId(
            params.id,
          );
          return status(200, eventos);
        },
        {
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: findEventsByUserIdUsuariosOutputSchema,
          },
        },
      )
      .post(
        "/",
        async ({ body, status }) => {
          const usuario = await UsuariosController.register(body);
          return status(201, usuario);
        },
        {
          body: createUsuarioInputSchema,
          response: {
            201: createUsuarioOutputSchema,
          },
        },
      )

      .patch(
        "/:id",
        async ({ params, body, status }) => {
          const usuario = await UsuariosController.update(params.id, body);
          return status(200, usuario);
        },
        {
          body: updateUsuarioInputSchema,
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: updateUsuarioOutputSchema,
          },
        },
      )
      .delete(
        "/:id",
        async ({ params, status }) => {
          await UsuariosController.delete(params.id);
          return status(204, null);
        },
        {
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            204: z.null().nullish(),
          },
        },
      )
      .delete(
        "emails/:email",
        async ({ params, status }) => {
          await UsuariosController.deleteByEmail(params.email);
          return status(204, null);
        },
        {
          params: z.object({
            email: z.email().describe("El email del usuario"),
          }),
          response: {
            204: z.null(),
          },
        },
      ),
  );
