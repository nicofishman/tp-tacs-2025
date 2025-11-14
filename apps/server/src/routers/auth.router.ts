import { RolUsuario } from "@prisma/client";
import { AuthController } from "@server/controllers/auth.controller";
import {
  signInResponseSchema,
  signInSchema,
} from "@server/schemas/auth/sign-in.schema";
import {
  signUpResponseSchema,
  signUpSchema,
} from "@server/schemas/auth/sign-up.schema";
import { usuarioSchema } from "@server/schemas/usuarios/usuario.schema";
import type { ElysiaWithLogger } from "@server/types";
import z from "zod";

const RUTA_AUTH = "/auth";

export const AuthRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_AUTH, { tags: ["Auth"] }, (app) =>
    app
      .post(
        "/sign-in",
        async ({ body, status, headers, set }) => {
          const { email, password } = body;

          const { user, token } = await AuthController.signIn({
            email,
            headers: headers as Record<string, string>,
            password,
          });

          const cookies = token.get("set-cookie");

          if (cookies) {
            set.headers["set-cookie"] = cookies;
          }

          return status(200, { user });
        },
        {
          body: signInSchema,
          response: {
            200: signInResponseSchema,
          },
        },
      )
      .post(
        "/sign-up",
        async ({ body, status, query }) => {
          const { email, password, nombre, rol } = body;

          // Si se proporciona rol en el body, usarlo. Si no, verificar adminToken
          // Si hay adminToken válido, usar ORGANIZADOR, sino PARTICIPANTE
          let isAdmin = false;
          if (rol) {
            isAdmin = rol === RolUsuario.ORGANIZADOR;
          } else if (query.adminToken === process.env.ADMIN_TOKEN) {
            isAdmin = true;
          }

          const user = await AuthController.signUp({
            email,
            isAdmin,
            nombre,
            password,
          });

          return status(200, user);
        },
        {
          body: signUpSchema,
          query: z.object({
            adminToken: z.string().optional(),
          }),
          response: {
            200: signUpResponseSchema,
            401: z.object({ message: z.string() }),
          },
        },
      )
      .get(
        "/me",
        async ({ user, status }) => {
          return status(200, user);
        },
        {
          response: {
            200: usuarioSchema,
          },
          role: [RolUsuario.ORGANIZADOR, RolUsuario.PARTICIPANTE],
        },
      ),
  );
