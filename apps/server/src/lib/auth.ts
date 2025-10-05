import { RolUsuario } from "@prisma/client";
import { usuarioSchema } from "@server/schemas/usuarios/usuario.schema";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import Elysia from "elysia";
import prisma from "../../prisma";

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: false,
    },
    defaultCookieAttributes: {
      httpOnly: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
      secure: true,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  user: {
    additionalFields: {
      rol: {
        defaultValue: RolUsuario.PARTICIPANTE,
        enum: RolUsuario,
        fieldName: "rol",
        input: true,
        returned: true,
        type: "string",
        validator: {
          input: usuarioSchema.shape.rol,
          output: usuarioSchema.shape.rol,
        },
      },
    },
    fields: {
      name: "nombre",
    },
    modelName: "Usuario",
  },
});

export const betterAuthElysia = new Elysia({ name: "better-auth" }).macro({
  role(role: RolUsuario | RolUsuario[]) {
    return {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        const rolesArray = Array.isArray(role) ? role : [role];
        if (!session || !rolesArray.includes(session.user.rol as RolUsuario))
          return status(401);
        return {
          session: session.session,
          user: {
            ...session.user,
            nombre: session.user.name,
            rol: session.user.rol as RolUsuario,
          },
        };
      },
    };
  },
});

export type AuthMacroFn = (typeof betterAuthElysia)["~Metadata"]["macroFn"];
export type AuthMacro = (typeof betterAuthElysia)["~Metadata"]["macro"];

type AuthMacroResult = Awaited<ReturnType<AuthMacroFn["role"]>>;

// Extract just the session and user part (successful authentication case)
export type AuthMacroResultType = Extract<
  AuthMacroResult,
  { session: unknown; user: unknown }
>;
