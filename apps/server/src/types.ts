import type Elysia from "elysia";
import type { app } from ".";

export type App = typeof app;
export type { Usuario } from "@prisma/client";

export type ElysiaWithLogger = Elysia<
  "",
  {
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    decorator: {};
    derive: {
      logger: {
        info: (message: string) => void;
        error: (message: string) => void;
        warn: (message: string) => void;
        debug: (message: string) => void;
      };
    };
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    store: {};
    // biome-ignore lint/complexity/noBannedTypes: A Elysia le gusta
    resolve: {};
  }
>;
