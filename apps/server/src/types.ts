import type Elysia from "elysia";
import type { app } from ".";
import type { createContextualLogger } from "./lib/logger";

export type App = typeof app;
export type { Usuario } from "@prisma/client";

export type ElysiaWithLogger = Elysia<
  "",
  {
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    decorator: {};
    derive: {
      logger: ReturnType<typeof createContextualLogger>;
    };
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    store: {};
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    resolve: {};
  }
>;
