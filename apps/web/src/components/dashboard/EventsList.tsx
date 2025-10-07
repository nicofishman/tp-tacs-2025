import type { Treaty } from "@elysiajs/eden";
import type { api } from "@web/lib/fetch";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

interface EventsListProps {
  events: Treaty.Data<typeof api.me.events.get>;
}

export function EventsList({ events }: EventsListProps) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Eventos creados por vos!</h2>
        <Link
          to="/create-event"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-2 py-1 font-bold text-white"
        >
          Crear evento
          <PlusIcon className="size-4" />
        </Link>
      </div>
      {events.length > 0 ? (
        <div className="mt-4 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg border p-4">
              <h3 className="font-semibold text-lg">{event.titulo}</h3>
              <p className="text-gray-600">{event.descripcion}</p>
              <p className="text-gray-500 text-sm">
                Fecha: {new Date(event.fechaInicio).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No hay eventos disponibles.</p>
      )}
    </section>
  );
}
