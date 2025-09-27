import { usuarioSchema } from "@server/schemas/usuarios/usuario.schema";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import Elysia from "elysia";
import prisma from "../../prisma";

export const auth = betterAuth({
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  },
  basePath: "/auth",
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    minPasswordLength: usuarioSchema.shape.password.minLength ?? 6,
    password: {
      hash(password) {
        return Bun.password.hash(password);
      },
      verify({ password, hash }) {
        return Bun.password.verify(password, hash);
      },
    },
  },
  plugins: [openAPI()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  user: {
    fields: {
      email: "email",
      id: "id",
      name: "nombre",
      rol: "rol",
    },
    modelName: "Usuario",
  },
});

export const betterAuthElysia = new Elysia({ name: "better-auth" }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        session: session.session,
        user: session.user,
      };
    },
  },
});

export type AuthMacroFn = (typeof betterAuthElysia)["~Metadata"]["macroFn"];
export type AuthMacro = (typeof betterAuthElysia)["~Metadata"]["macro"];

type AuthMacroResult = Awaited<ReturnType<AuthMacroFn["auth"]["resolve"]>>;

// Extract just the session and user part (successful authentication case)
export type AuthMacroResultType = Extract<
  AuthMacroResult,
  { session: unknown; user: unknown }
>;

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
// biome-ignore lint/suspicious/noAssignInExpressions: viene del tuto de better-auth
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  components: getSchema().then(({ components }) => components) as Promise<any>,
  getPaths: (prefix = "/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          // biome-ignore lint/suspicious/noExplicitAny: viene del tuto de better-auth
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
} as const;
