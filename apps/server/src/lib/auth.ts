import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
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
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
});

export const betterAuthElysia = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401, { error: "No autenticado" });

        const userPrisma = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        });

        return {
          session: session.session,
          user: userPrisma,
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
