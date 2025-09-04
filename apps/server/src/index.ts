import { Elysia } from "elysia";
import { EventosRouter } from "./routers/eventos.router";
import { HealthRouter } from "./routers/health.router";
import { UsuariosRouter } from "./routers/usuarios.router";

const app = new Elysia();

HealthRouter(app);
UsuariosRouter(app);
EventosRouter(app);

app.listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
