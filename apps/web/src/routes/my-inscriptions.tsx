import type { Treaty } from "@elysiajs/eden";
import { EventsHeader } from "@web/components/events/EventsHeader";
import { EventsList } from "@web/components/events/EventsList";
import { api } from "@web/lib/fetch";
import { useEffect, useState } from "react";

type InscriptionsGetResponse = Treaty.Data<typeof api.me.inscriptions.get>;
type Inscripcion = InscriptionsGetResponse extends { items: (infer I)[] }
  ? I
  : never;

export default function MyInscriptions() {
  const [inscriptions, setInscriptions] = useState<InscriptionsGetResponse>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        setLoading(true);
        const result = await api.me.inscriptions.get();
        if (result.error || result.status !== 200)
          throw new Error("Error fetching inscriptions");
        setInscriptions(result.data || []);
      } catch {
        setInscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInscriptions();
  }, []);

  // Extraemos los eventos
  const events = inscriptions.map((inscription) => ({
    ...inscription.evento,
    // Podemos agregar el estado de la inscripción si queremos mostrarlo en la lista
    inscriptionEstado: inscription.estado,
  }));

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EventsHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600 text-xl">
            Cargando tus inscripciones...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EventsHeader />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <EventsList
            events={events}
            loadingPage={false}
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
        </div>
      </section>
    </div>
  );
}
