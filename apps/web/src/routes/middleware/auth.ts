import { userContext } from "@web/lib/context";
import { redirect } from "react-router";

async function authMiddleware({
  request,
  context,
}: {
  request: Request;
  context: Map<unknown, unknown>;
}) {
  try {
    // Get the cookies from the request headers
    const cookieHeader = request.headers.get("cookie");

    // For server-side auth check, we'll need to verify the session
    // This is a simplified version - in production you'd want proper server-side session validation
    if (!cookieHeader || !cookieHeader.includes("better-auth.session_token")) {
      throw redirect("/sign-in");
    }

    // For now, we'll skip the server-side user fetch since the client handles this
    // In a real app, you'd validate the session server-side and fetch user data

    // Set a placeholder context - the client-side auth provider will handle the real auth state
    context.set(userContext, null);
  } catch {
    // If there's any error with authentication, redirect to login
    throw redirect("/sign-in");
  }
}

export const middleware = [authMiddleware];
