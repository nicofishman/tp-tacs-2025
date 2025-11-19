import { EventsList } from "@web/components/dashboard/EventsList";
import { Stats } from "@web/components/dashboard/Stats";
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

    const estadisticas = await api.estadisticas.get({
      headers: {
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    if (estadisticas.error) {
      throw new Error(
        `Failed to fetch estadisticas: ${estadisticas.error.value}`,
      );
    }

    const estadisticasData = estadisticas.data;

    if (response.error) {
      throw new Error(`Failed to fetch events: ${response.error.value}`);
    }

    const events = response.data;
    return { estadisticas: estadisticasData, events };
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
  const { events, estadisticas } = loaderData;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 font-bold text-3xl">Dashboard</h1>
      <p className="text-lg">
        Este es el resumen de tus eventos y estadísticas!
      </p>
      {/** biome-ignore lint/style/noNonNullAssertion: Esto siempre va a tener datos */}
      <Stats stats={estadisticas!} />
      <EventsList events={events} />
    </div>
  );
}
