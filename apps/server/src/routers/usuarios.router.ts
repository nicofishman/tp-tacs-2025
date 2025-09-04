import type { Elysia } from "elysia";
import { UsuariosController } from "../controllers/usuarios.controller";
import type { CreateUsuarioDto } from "../dtos/usuarios/input/create-usuario.dto";
import type { ReplaceUsuarioDto } from "../dtos/usuarios/input/replace-usuario.dto";
import type { UpdateUsuarioDto } from "../dtos/usuarios/input/update-usuario.dto";

// Define las rutas para la entidad Usuario
// Params => PathVariable
// Query => QueryParam
// Body => RequestBody
export const UsuariosRouter = (app: Elysia) => {
	app.get("/usuarios", async () => {
		return await UsuariosController.findAll();
	});

	app.get("/usuarios/:id", async ({ params }) => {
		try {
			return await UsuariosController.findById(params.id);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Response(JSON.stringify({ error: errorMessage }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}
	});

	app.post("/usuarios", async ({ body }: { body: CreateUsuarioDto }) => {
		try {
			return await UsuariosController.create(body);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Response(JSON.stringify({ error: errorMessage }), {
				status: 400, // o el código que corresponda según el error
				headers: { "Content-Type": "application/json" },
			});
		}
	});

	app.put(
		"/usuarios/:id",
		async ({
			params,
			body,
		}: {
			params: { id: string };
			body: ReplaceUsuarioDto;
		}) => {
			try {
				return await UsuariosController.update(params.id, body);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				let status = 400;
				if (errorMessage.includes("Usuario no encontrado")) status = 404;
				return new Response(JSON.stringify({ error: errorMessage }), {
					status,
					headers: { "Content-Type": "application/json" },
				});
			}
		},
	);

	app.patch(
		"/usuarios/:id",
		async ({
			params,
			body,
		}: {
			params: { id: string };
			body: UpdateUsuarioDto;
		}) => {
			try {
				return await UsuariosController.partialUpdate(params.id, body);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				let status = 400;
				if (errorMessage.includes("Usuario no encontrado")) status = 404;
				return new Response(JSON.stringify({ error: errorMessage }), {
					status,
					headers: { "Content-Type": "application/json" },
				});
			}
		},
	);

	app.delete(
		"/usuarios/:id",
		async ({ params }: { params: { id: string } }) => {
			try {
				await UsuariosController.delete(params.id);
				return new Response(null, { status: 204 });
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				const status = 404;
				return new Response(JSON.stringify({ error: errorMessage }), {
					status,
					headers: { "Content-Type": "application/json" },
				});
			}
		},
	);
};
