import { TypeBoxFromZod } from "@sinclair/typemap";
import type { Elysia } from "elysia";
import z from "zod";
import {
  CreateUsuarioSchema,
  RegisterUsuarioSchema,
  ReplaceUsuarioSchema,
  UpdateUsuarioSchema,
} from "@/schemas/usuarios/usuario.input.schema";
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
      .get("/", async ({ set }) =>
        handleRoute(async () => {
          const usuarios = await UsuariosController.findAll();
          set.status = 200;
          return usuarios;
        }),
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
          params: TypeBoxFromZod(
            z.object({
              id: z.string(),
            }),
          ),
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
            const usuario = await UsuariosController.create(body);
            set.status = 201;
            return usuario;
          }),
        {
          body: TypeBoxFromZod(CreateUsuarioSchema),
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
          body: TypeBoxFromZod(RegisterUsuarioSchema),
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
          body: TypeBoxFromZod(ReplaceUsuarioSchema),
          params: TypeBoxFromZod(
            z.object({
              id: z.string(),
            }),
          ),
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
          body: TypeBoxFromZod(UpdateUsuarioSchema),
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
            await UsuariosController.delete(params.id);
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
          params: TypeBoxFromZod(
            z.object({
              email: z.string().email(),
            }),
          ),
        },
      ),
  );
