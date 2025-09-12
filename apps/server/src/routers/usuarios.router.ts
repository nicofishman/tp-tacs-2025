import type { Elysia } from "elysia";
import z from "zod";
import {
  createUsuarioInputSchema,
  createUsuarioOutputSchema,
} from "@/schemas/usuarios/create-usuario.schema";
import { findAllUsuariosOutputSchema } from "@/schemas/usuarios/findAll-usuarios.schema";
import { findByIdUsuariosOutputSchema } from "@/schemas/usuarios/findById-usuarios.schema";
import { findEventsByUserIdUsuariosOutputSchema } from "@/schemas/usuarios/findEventsByUserId-usuarios.schema";
import {
  replaceUsuarioInputSchema,
  replaceUsuarioOutputSchema,
} from "@/schemas/usuarios/replace-usuario.schema";
import {
  updateUsuarioInputSchema,
  updateUsuarioOutputSchema,
} from "@/schemas/usuarios/update-usuario.schema";
import { UsuariosController } from "../controllers/usuarios.controller";
import { handleRoute } from "./handleRoute";

// Define las rutas para la entidad Usuario
// Params => PathVariable
// Query => QueryParam
// Body => RequestBody

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
      .put(
        "/:id",
        async ({ params, body, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.replace(params.id, body);
            set.status = 200;
            return usuario;
          }),
        {
          body: replaceUsuarioInputSchema,
          params: z.object({
            id: z.string().describe("El ID del usuario"),
          }),
          response: {
            200: replaceUsuarioOutputSchema,
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
