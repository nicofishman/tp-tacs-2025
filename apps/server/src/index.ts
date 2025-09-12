import { openapi } from "@elysiajs/openapi";
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
      documentation: {
        info: {
          description: "API para el TP-TACS",
          title: "TP-TACS API",
          version: "1.0.1",
        },
      },
      path: "/swagger",
    }),
  )
  .use(HealthRouter)
  .use(UsuariosRouter)
  .use(EventosRouter)
  .use(CategoriasRouter)
  .use(InscripcionesRouter)
  .listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
