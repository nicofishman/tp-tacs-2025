import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { CategoriasRouter } from "./routers/categorias.router";
import { EventosRouter } from "./routers/eventos.router";
import { HealthRouter } from "./routers/health.router";
import { InscripcionesRouter } from "./routers/inscripciones.router";
import { UsuariosRouter } from "./routers/usuarios.router";

export const app = new Elysia()
  .use(swagger())
  .use(HealthRouter)
  .use(UsuariosRouter)
  .use(EventosRouter)
  .use(CategoriasRouter)
  .use(InscripcionesRouter);

app.listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
