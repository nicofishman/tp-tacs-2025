import type { Treaty } from "@elysiajs/eden";
import { EventsHeader } from "@web/components/events/EventsHeader";
import { EventsList } from "@web/components/events/EventsList";
import { api } from "@web/lib/fetch";
import { Suspense } from "react";
import { Await, useNavigation } from "react-router";
import type { Route } from "./+types/my-inscriptions";

type InscriptionsGetResponse = Treaty.Data<typeof api.me.inscriptions.get>;

export async function loader({ request }: Route.LoaderArgs) {
  const headers = { Cookie: request.headers.get("Cookie") || "" };
  const inscriptions = api.me.inscriptions
    .get({ headers })
    .then((res) =>
      res.status === 200 && Array.isArray(res.data) ? res.data : [],
    );
  return { inscriptions };
}

export default function MyInscriptions({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const { inscriptions } = loaderData;

  // Events are derived inside <Await>

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric",
        })
      : "-";

  const formatTime = (d?: string) =>
    d
      ? new Date(d).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const formatPrice = (p?: number) =>
    p == null
      ? "-"
      : p === 0
        ? "Gratis"
        : new Intl.NumberFormat("es-AR", {
            currency: "ARS",
            style: "currency",
          }).format(p);

  const formatDuration = (
    dur?: { horas?: number; minutos?: number } | null,
  ) => {
    if (!dur) return "-";
    const { horas = 0, minutos = 0 } = dur;
    if (horas === 0 && minutos === 0) return "-";
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas}h`;
    return `${horas}h ${minutos}min`;
  };

  const loadingPage = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-gray-50">
      <EventsHeader title="Mis Inscripciones" />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="text-gray-600 text-xl">
                  Cargando tus inscripciones...
                </div>
              </div>
            }
          >
            <Await resolve={inscriptions}>
              {(ins: InscriptionsGetResponse) => {
                const events = ins.map((inscription) => ({
                  ...inscription.evento,
                  inscriptionState: inscription.estado,
                }));
                return (
                  <>
                    <EventsList
                      events={events}
                      loadingPage={loadingPage}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      formatDuration={formatDuration}
                      formatPrice={formatPrice}
                      mode="my-inscriptions"
                    />
                    {events.length === 0 && (
                      <div className="py-12 text-center">
                        <div className="mb-4 text-6xl">🎟️</div>
                        <h3 className="mb-2 font-bold text-2xl text-gray-900">
                          No estás inscrito a ningún evento
                        </h3>
                        <p className="mb-4 text-gray-600">
                          Una vez que te inscribas a eventos, aparecerán aquí.
                        </p>
                      </div>
                    )}
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </section>
    </div>
  );
}
