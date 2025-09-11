import type { Elysia } from "elysia";
import z from "zod";
import {
  CreateUsuarioSchema,
  RegisterUsuarioSchema,
  ReplaceUsuarioSchema,
  UpdateUsuarioSchema,
} from "@/schemas/usuarios/usuario.input.schema";
import { UsuarioOutputSchema } from "@/schemas/usuarios/usuario.output.schema";
import { UsuariosController } from "../controllers/usuarios.controller";
import { handleRoute } from "./handleRoute";

// Define las rutas para la entidad Usuario
// Params => PathVariable
// Query => QueryParam
// Body => RequestBody

const RUTA_USUARIOS = "/usuarios";

export const UsuariosRouter = (app: Elysia) =>
  app.group(RUTA_USUARIOS, (app) =>
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
            200: z.array(UsuarioOutputSchema),
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
            200: UsuarioOutputSchema,
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
            id: z.string(),
          }),
        },
      )
      .post(
        "/",
        async ({ body, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.create(body);
            set.status = 201;
            return usuario;
          }),
        {
          body: CreateUsuarioSchema,
        },
      )
      .post(
        "/register",
        async ({ body, set }) =>
          handleRoute(async () => {
            const usuario = await UsuariosController.register(body);
            set.status = 201;
            return usuario;
          }),
        {
          body: RegisterUsuarioSchema,
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
          body: ReplaceUsuarioSchema,
          params: z.object({
            id: z.string(),
          }),
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
          body: UpdateUsuarioSchema,
          params: z.object({
            id: z.string(),
          }),
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
            id: z.string(),
          }),
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
            email: z.email(),
          }),
        },
      ),
  );
