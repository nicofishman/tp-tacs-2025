import { useAuth } from "@web/components/auth-provider";
import { EventsList } from "@web/components/dashboard/EventsList";
import Loader from "@web/components/loader";
import { api } from "@web/lib/fetch";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  // Fetch events data server-side
  try {
    const response = await api.me.events.get({
      headers: {
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    if (response.error) {
      throw new Error(`Failed to fetch events: ${response.error.value}`);
    }

    const events = response.data;
    return { events };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { events: [] };
  }
}

export function meta(): Array<Record<string, string>> {
  return [
    {
      content: "Dashboard del organizador",
      title: "Dashboard - EventApp",
    },
  ];
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user, isLoading } = useAuth();
  const { events } = loaderData;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 font-bold text-3xl">Dashboard</h1>
      <p className="text-lg">Bienvenido de vuelta, {user?.nombre}!</p>
      <EventsList events={events} />
    </div>
  );
}
