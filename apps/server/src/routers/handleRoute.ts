import { ConflictError } from "@server/exceptions/ConflictError";
import { NotFoundError } from "@server/exceptions/NotFoundError";
import { ValidationError } from "@server/exceptions/ValidationError";

// Handler genérico para rutas que captura errores y responde con el formato adecuado.
// Usa las excepciones personalizadas para determinar el código de estado y el mensaje.
export async function handleRoute<T>(fn: () => Promise<T>): Promise<T> {
  try {
    const result = await fn();
    return result;
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
    throw new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status,
    });
  }
}
