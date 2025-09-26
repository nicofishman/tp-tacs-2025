import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import z from "zod";
import { ConflictError } from "./exceptions/ConflictError";
import { NotFoundError } from "./exceptions/NotFoundError";
import { ValidationError } from "./exceptions/ValidationError";
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
  .error({
    ConflictError,
    NotFoundError,
    ValidationError,
  })
  .onError(({ error, status, code }) => {
    switch (code) {
      case "ConflictError":
        return status(409, { error: error.message });
      case "NotFoundError":
        return status(404, { error: error.message });
      case "ValidationError":
        return status(400, { error: error.message });
      case "VALIDATION":
        return status(400, { error: error.customError });
      default:
        if ("status" in error) {
          return status(error.status, { error: error.message });
        }
        console.error(error);

        return status(500, { error: "Error interno del servidor" });
    }
  })
  .use(HealthRouter)
  .use(UsuariosRouter)
  .use(EventosRouter)
  .use(CategoriasRouter)
  .use(InscripcionesRouter)
  .listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
