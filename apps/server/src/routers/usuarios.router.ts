import type { Elysia } from "elysia";
import type { RegisterUsuarioDto } from "@/dtos/usuarios/input/register-usuario.dto";
import { UsuariosController } from "../controllers/usuarios.controller";
import type { CreateUsuarioDto } from "../dtos/usuarios/input/create-usuario.dto";
import type { ReplaceUsuarioDto } from "../dtos/usuarios/input/replace-usuario.dto";
import type { UpdateUsuarioDto } from "../dtos/usuarios/input/update-usuario.dto";
import { handleRoute } from "./handleRoute";

// Define las rutas para la entidad Usuario
// Params => PathVariable
// Query => QueryParam
// Body => RequestBody

const RUTA_USUARIOS = "/usuarios";

export const UsuariosRouter = (app: Elysia) => {
  app.get(RUTA_USUARIOS, async ({ set }: { set: { status: number } }) =>
    handleRoute(async () => {
      const usuarios = await UsuariosController.findAll();
      set.status = 200;
      return usuarios;
    }),
  );

  app.get(
    `${RUTA_USUARIOS}/:id`,
    async ({
      params,
      set,
    }: {
      params: { id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.findById(params.id);
        set.status = 200;
        return usuario;
      }),
  );

  app.post(
    RUTA_USUARIOS,
    async ({
      body,
      set,
    }: {
      body: CreateUsuarioDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.create(body);
        set.status = 201;
        return usuario;
      }),
  );

  app.post(
    `${RUTA_USUARIOS}/register`,
    async ({
      body,
      set,
    }: {
      body: RegisterUsuarioDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.register(body);
        set.status = 201;
        return usuario;
      }),
  );

  app.put(
    `${RUTA_USUARIOS}/:id`,
    async ({
      params,
      body,
      set,
    }: {
      params: { id: string };
      body: ReplaceUsuarioDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.replace(params.id, body);
        set.status = 200;
        return usuario;
      }),
  );

  app.patch(
    `${RUTA_USUARIOS}/:id`,
    async ({
      params,
      body,
      set,
    }: {
      params: { id: string };
      body: UpdateUsuarioDto;
      set: { status: number };
    }) =>
      handleRoute(async () => {
        const usuario = await UsuariosController.update(params.id, body);
        set.status = 200;
        return usuario;
      }),
  );

  app.delete(
    `${RUTA_USUARIOS}/:id`,
    async ({
      params,
      set,
    }: {
      params: { id: string };
      set: { status: number };
    }) =>
      handleRoute(async () => {
        await UsuariosController.delete(params.id);
        set.status = 204;
        return null;
      }),
  );
};
