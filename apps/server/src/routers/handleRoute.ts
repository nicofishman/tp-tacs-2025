import { ConflictError } from "@/exceptions/ConflictError";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { ValidationError } from "@/exceptions/ValidationError";

// Handler genérico para rutas que captura errores y responde con el formato adecuado.
// Usa las excepciones personalizadas para determinar el código de estado y el mensaje.
export async function handleRoute(fn: () => Promise<unknown>) {
	try {
		return await fn();
	} catch (error) {
		let status = 500;
		let errorMessage = "Error interno del servidor";
		if (
			error instanceof NotFoundError ||
			error instanceof ValidationError ||
			error instanceof ConflictError
		) {
			status = error.status;
			errorMessage = error.message;
		}
		if (status === 500) {
			console.error("InternalServerError:", error);
		}
		return new Response(JSON.stringify({ error: errorMessage }), {
			status,
			headers: { "Content-Type": "application/json" },
		});
	}
}
