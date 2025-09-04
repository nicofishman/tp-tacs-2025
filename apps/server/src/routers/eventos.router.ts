import { EventosController } from "@/controllers/eventos.controller";
import type { CreateEventoDto } from "@/dtos/eventos/input/create-evento.dto";
import type { Elysia } from "elysia";

// Define las rutas para la entidad Evento
// Params => PathVariable
// Query => QueryParam
// Body => RequestBody
export const EventosRouter = (app: Elysia) => {
	app.get("/eventos", async () => {
		return await EventosController.findAll();
	});

	app.post("/eventos", async ({ body }: { body: CreateEventoDto }) => {
		try {
			return await EventosController.create(body);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Response(JSON.stringify({ error: errorMessage }), {
				status: 400, // o el código que corresponda según el error
				headers: { "Content-Type": "application/json" },
			});
		}
	});
};
