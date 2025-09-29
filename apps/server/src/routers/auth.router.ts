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
        async ({ body, status }) => {
          const { email, password, nombre } = body;
          const user = await AuthController.signUp({ email, nombre, password });

          return status(200, user);
        },
        {
          body: signUpSchema,
          response: {
            200: signUpResponseSchema,
          },
        },
      )
      .get(
        "/me",
        async ({ user, status }) => {
          return status(200, user);
        },
        {
          auth: true,
          response: {
            200: usuarioSchema.omit({ password: true }),
          },
        },
      ),
  );
