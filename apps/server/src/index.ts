import { usuarioController } from "@/controllers/usuarios.controller";
import { Elysia } from "elysia";

const app = new Elysia();

usuarioController(app);

app.get("/health", () => ({
    status: "ok"
}));

app.listen(3000);

console.log("🚀 Servidor corriendo en http://localhost:3000");
