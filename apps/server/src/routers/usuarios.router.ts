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
import { handleRoute } from "./handleRoute";

const RUTA_USUARIOS = "/usuarios";

export const UsuariosRouter = (app: Elysia) =>
  app.group(RUTA_USUARIOS, { tags: ["Usuarios"] }, (app) =>
    app
      .get(
        "/",
        async ({ set }) =>
          handleRoute(async () => {
            const usuarios = await UsuariosController.findAll();
            set.status = 200;
            return usuarios;
          }),
        {
          response: {
            200: findAllUsuariosOutputSchema,
          },
        },
      )
      .get(
        "/:id",
        async ({ params, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.findById(params.id);
            set.status = 200;
            return usuario;
          }),
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
        async ({ params, set }) =>
          handleRoute(async () => {
            const eventos = await UsuariosController.findEventsByUserId(
              params.id,
            );
            set.status = 200;
            return eventos;
          }),
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
        async ({ body, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.register(body);
            set.status = 201;
            return usuario;
          }),
        {
          body: createUsuarioInputSchema,
          response: {
            201: createUsuarioOutputSchema,
          },
        },
      )

      .patch(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.update(params.id, body);
            set.status = 200;
            return usuario;
          }),
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
        async ({ params, set }) =>
          handleRoute(async () => {
            await UsuariosController.delete(params.id);
            set.status = 204;
            return null;
          }),
        {
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            204: z.null(),
          },
        },
      )
      .delete(
        "emails/:email",
        async ({ params, set }) =>
          handleRoute(async () => {
            await UsuariosController.deleteByEmail(params.email);
            set.status = 204;
            return null;
          }),
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
