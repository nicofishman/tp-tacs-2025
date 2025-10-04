import type { Treaty } from "@elysiajs/eden";
import type { api } from "@web/lib/fetch";
import type React from "react";
import { EventCard } from "./EventCard";

type EventosGetResponse = Treaty.Data<typeof api.eventos.get>;
type Evento = EventosGetResponse extends { items: (infer E)[] } ? E : never;

export interface EventsListProps {
  events: Evento[];
  loadingPage: boolean;
  formatDate: (d?: string) => string;
  formatTime: (d?: string) => string;
  formatDuration: (dur?: { horas?: number; minutos?: number } | null) => string;
  formatPrice: (p?: number) => string;
}

export const EventsList: React.FC<EventsListProps> = ({
  events,
  loadingPage,
  formatDate,
  formatTime,
  formatDuration,
  formatPrice,
}) => {
  return (
    <div className="relative">
      {loadingPage && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="text-gray-600">Cargando...</div>
        </div>
      )}
      <div className="grid gap-8 lg:grid-cols-2">
        {events.map((event, idx) => (
          <EventCard
            key={event.id ?? `event-${idx}`}
            event={event}
            formatDate={formatDate}
            formatTime={formatTime}
            formatDuration={formatDuration}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </div>
  );
};
