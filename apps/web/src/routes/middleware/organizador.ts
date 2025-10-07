import type { RolUsuario } from "@server/types";
import { userContext } from "@web/lib/context";
import { api } from "@web/lib/fetch";
import { redirect } from "react-router";

const middlewareGenerico = (rol: RolUsuario) =>
  async function middlewareGenerico({
    request,
    context,
  }: {
    request: Request;
    context: Map<unknown, unknown>;
  }) {
    try {
      // Get the cookies from the request headers
      const cookieHeader = request.headers.get("cookie");

      // Check if we have a session cookie
      if (
        !cookieHeader ||
        !cookieHeader.includes("better-auth.session_token")
      ) {
        throw redirect("/sign-in");
      }

      // Validate the session by calling the server's /auth/me endpoint
      const response = await api.auth.me.get();

      if (!response.data || response.data.rol !== rol) {
        throw redirect("/sign-in");
      }

      const user = response.data;

      // Set the authenticated user in context
      context.set(userContext, user);
    } catch (error) {
      // If there's any error with authentication, redirect to login
      if (error instanceof Response && error.status === 302) {
        throw error; // Re-throw redirect responses
      }
      throw redirect("/sign-in");
    }
  };

export const organizadorMiddleware = middlewareGenerico("ORGANIZADOR");

export const participanteMiddleware = middlewareGenerico("PARTICIPANTE");
