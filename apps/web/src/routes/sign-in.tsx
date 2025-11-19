import { api } from "@web/lib/fetch";
import { redirect } from "react-router";
import SignInForm from "../components/sign-in-form";
import type { Route } from "./+types/sign-in";

export async function loader({ request }: Route.LoaderArgs) {
  const headers = { Cookie: request.headers.get("Cookie") || "" };
  const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

  const me = await api.me.get({ headers }); // or api.auth["sign-in"].post, etc.
  const user = me.status === 200 ? me.data : null;

  // use user for SSR decisions, data fetching, redirects, etc.
  if (user) {
    throw redirect(redirectTo, { status: 302 });
  }

  return null;
}

export default function SignIn() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  );
}
