import { Elysia } from "elysia";
import { CategoriasRouter } from "./routers/categorias.router";
import { HealthRouter } from "./routers/health.router";
import { UsuariosRouter } from "./routers/usuarios.router";

const app = new Elysia();

HealthRouter(app);
UsuariosRouter(app);
CategoriasRouter(app);

app.listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
