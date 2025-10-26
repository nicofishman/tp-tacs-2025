import type { Treaty } from "@elysiajs/eden";
import { api } from "@web/lib/fetch";
import type React from "react";
import { toast } from "sonner";

type EventosGetResponse = Treaty.Data<typeof api.eventos.get>;
type Evento = EventosGetResponse extends { items: (infer E)[] } ? E : never;
type InscripcionResponse = Treaty.Data<typeof api.eventos.post>;

export interface EventCardProps {
  event: Evento;
  formatDate: (d?: string) => string;
  formatTime: (d?: string) => string;
  formatDuration: (dur?: { horas?: number; minutos?: number } | null) => string;
  formatPrice: (p?: number) => string;
  mode: "events" | "my-inscriptions";
  state: "CANCELADO" | "FINALIZADO" | "EN_PROCESO" | "PENDIENTE";
  inscriptionState?: "CONFIRMADO" | "WAITLIST" | "CANCELADO";
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  formatDate,
  formatTime,
  formatDuration,
  formatPrice,
  mode,
  state,
  inscriptionState,
}) => {
  const handleInscribirse = async () => {
    try {
      const _response: InscripcionResponse = await api
        .eventos({ id: event.id })
        .register.post();
      toast.success(
        "Inscripción realizada con éxito! Tu inscripción está confirmada.",
      );
    } catch (err) {
      console.error(err);
      toast.error("Error inesperado al inscribirse");
    }
  };

  const handleDesinscribirse = async () => {
    try {
      await api.eventos({ id: event.id }).unregister.post();
      toast.success("Te has desinscripto del evento.");
    } catch (err) {
      console.error(err);
      toast.error("Error al desinscribirse");
    }
  };

  // 🔹 Colores por estado del evento
  const stateColors: Record<typeof state, string> = {
    CANCELADO: "text-red-600",
    EN_PROCESO: "text-blue-600",
    FINALIZADO: "text-gray-500",
    PENDIENTE: "text-yellow-500",
  };

  // 🔹 Colores por estado de inscripción
  const inscriptionColors: Record<
    NonNullable<typeof inscriptionState>,
    string
  > = {
    CANCELADO: "text-red-600",
    CONFIRMADO: "text-green-600",
    WAITLIST: "text-yellow-500",
  };

  return (
    <div className="hover:-translate-y-1 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-linear-to-r from-blue-400 to-purple-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="rounded-full bg-black/30 px-3 py-1 font-medium text-sm backdrop-blur-sm">
            {event.categoria?.nombre ?? "Sin categoría"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-3 font-bold text-2xl text-gray-900">
          {event.titulo}
        </h3>

        <div className="mb-4 space-y-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-gray-300" />
            {formatDate(event.fechaInicio)}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-gray-300" />
            {formatTime(event.fechaInicio)} • {formatDuration(event.duracion)}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-gray-300" />
            {event.ubicacion?.direccion ?? "Ubicación no disponible"}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-gray-300" />
            Máximo {event.cupoMaximo ?? "-"} participantes
            {event.cupoMinimo ? ` • Mínimo ${event.cupoMinimo}` : ""}
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-gray-700 text-sm leading-relaxed">
          {event.descripcion ?? ""}
        </p>

        <div className="mb-4 text-gray-500 text-xs">
          Organizado por{" "}
          <span className="font-medium">
            {event.organizador?.nombre ??
              event.organizador?.email ??
              "Organizador"}
          </span>
        </div>

        {/* 🔹 Estado del evento */}
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium text-gray-600 text-sm">
            Estado Evento:
          </span>
          <span className={`font-bold text-lg ${stateColors[state]}`}>
            {state}
          </span>
        </div>

        {/* 🔹 Estado de inscripción (solo si existe) */}
        {inscriptionState && (
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium text-gray-600 text-sm">
              Estado de la inscripción:
            </span>
            <span
              className={`font-bold text-lg ${inscriptionColors[inscriptionState]}`}
            >
              {inscriptionState}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-2xl text-blue-600">
            {formatPrice(event.precio)}
          </span>

          {mode === "events" ? (
            <button
              type="button"
              onClick={handleInscribirse}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700"
            >
              Inscribirse
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDesinscribirse}
              className="rounded-lg bg-red-600 px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-red-700"
            >
              Desinscribirse
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
