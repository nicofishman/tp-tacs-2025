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

export const UsuariosRouter = (app: Elysia) => {
  app.get(RUTA_USUARIOS, async ({ set }) =>
    handleRoute(async () => {
      const usuarios = await UsuariosController.findAll();
      set.status = 200;
      return usuarios;
    }),
  );

  app.get(
    `${RUTA_USUARIOS}/:id`,
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
  );

  app.post(
    RUTA_USUARIOS,
    async ({ body, set }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.create(body);
        set.status = 201;
        return usuario;
      }),
    {
      body: TypeBoxFromZod(CreateUsuarioSchema),
    },
  );

  app.post(
    `${RUTA_USUARIOS}/register`,
    async ({ body, set }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.register(body);
        set.status = 201;
        return usuario;
      }),
    {
      body: TypeBoxFromZod(RegisterUsuarioSchema),
    },
  );

  app.put(
    `${RUTA_USUARIOS}/:id`,
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
  );

  app.patch(
    `${RUTA_USUARIOS}/:id`,
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
  );

  app.delete(
    `${RUTA_USUARIOS}/:id`,
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
  );
};
