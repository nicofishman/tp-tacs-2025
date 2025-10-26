/** biome-ignore-all lint/complexity/noBannedTypes: A Elysia le gusta */
import type Elysia from "elysia";
import type { app } from ".";
import type { AuthMacro, AuthMacroFn } from "./lib/auth";
import type { createContextualLogger } from "./lib/logger";

export type App = typeof app;
export type { RolUsuario, Usuario } from "@prisma/client";

export type ElysiaWithLogger = Elysia<
  "",
  {
    decorator: {};
    derive: {
      logger: ReturnType<typeof createContextualLogger>;
    };
    store: {};
    resolve: {};
  },
  {
    error: {};
    typebox: {};
  },
  {
    macroFn: AuthMacroFn;
    macro: AuthMacro;
    parser: {};
    response: {};
    schema: {};
    standaloneSchema: {};
  }
>;
