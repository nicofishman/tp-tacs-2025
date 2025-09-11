import { openapi } from "@elysiajs/openapi";
import { fromTypes } from "@elysiajs/openapi/gen";
import { Elysia } from "elysia";
import z from "zod";
import { CategoriasRouter } from "./routers/categorias.router";
import { EventosRouter } from "./routers/eventos.router";
import { HealthRouter } from "./routers/health.router";
import { InscripcionesRouter } from "./routers/inscripciones.router";
import { UsuariosRouter } from "./routers/usuarios.router";

z.config(z.locales.es());

export const app = new Elysia()
  .use(
    openapi({
      path: "/swagger",
      provider: "scalar",
      references: fromTypes("src/index.ts", {
        debug: true,
      }),
      specPath: "/swagger.json",
    }),
  )
  .use(HealthRouter)
  .use(UsuariosRouter)
  .use(EventosRouter)
  .use(CategoriasRouter)
  .use(InscripcionesRouter)
  .listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
