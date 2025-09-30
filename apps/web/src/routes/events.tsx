// src/routes/events.tsx
"use client"; // Solo el Client Component necesita esto, Server Component no lo tiene

import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, DollarSign, Filter, MapPin, Search, Users, X } from "lucide-react";
import { api } from "@web/lib/fetch";
import type { Treaty } from "@elysiajs/eden";

// Inferimos automáticamente el tipo de respuesta desde treaty:
type EventosResponse = Treaty.Data<ReturnType<typeof api.eventos.get>>;
type Evento = EventosResponse["items"][number];

// ---------------------------
// ✅ SERVER COMPONENT (RSC)
// ---------------------------
export default async function Events() {
  const eventos = await api.eventos.get(); // fetch en servidor
  return <EventsClient initialEvents={eventos} />; // pasa como prop al cliente
}

// ---------------------------
// ✅ CLIENT COMPONENT
// ---------------------------
type EventFilters = {
  categoria: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
  palabrasClave: string;
  precioMax: string;
  precioMin: string;
  ubicacion: string;
};

function EventsClient({ initialEvents }: { initialEvents: EventosResponse }) {
  const [filters, setFilters] = useState<EventFilters>({
    categoria: "all",
    estado: "activo",
    fechaDesde: "",
    fechaHasta: "",
    palabrasClave: "",
    precioMax: "",
    precioMin: "",
    ubicacion: "all",
  });

  const [eventsResponse, setEventsResponse] = useState<EventosResponse>(initialEvents);
  const [events, setEvents] = useState<Evento[]>(initialEvents.items);
  const [page, setPage] = useState(initialEvents.page ?? 1);
  const [limit, setLimit] = useState(initialEvents.limit ?? 10);
  const [showFilters, setShowFilters] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const fetchPage = async (p: number, l: number) => {
    try {
      setLoadingPage(true);
      const resp: EventosResponse = await api.eventos.get();
      setEventsResponse(resp);
      setEvents(resp.items);
      setPage(resp.page ?? p);
      setLimit(resp.limit ?? l);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error fetching events page:", err);
    } finally {
      setLoadingPage(false);
    }
  };

  // Evitar fetch redundante en primer render
  useEffect(() => {
    if (page !== (eventsResponse.page ?? 1) || limit !== (eventsResponse.limit ?? 10)) {
      fetchPage(page, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const updateFilter = (key: keyof EventFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      categoria: "all",
      estado: "activo",
      fechaDesde: "",
      fechaHasta: "",
      palabrasClave: "",
      precioMax: "",
      precioMin: "",
      ubicacion: "all",
    });
  };

  // ---------------------------
  // MEMOIZED FILTERS
  // ---------------------------
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(events.map(e => e.categoria?.nombre ?? "Sin categoría")));
    return [
      { label: "Todas las categorías", value: "all" },
      ...uniqueCategories.map(c => ({ label: c, value: c })),
    ];
  }, [events]);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(events.map(e => e.ubicacion?.direccion ?? "Sin dirección")));
    return [
      { label: "Todas las ubicaciones", value: "all" },
      ...uniqueLocations.map(l => ({ label: l, value: l })),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (filters.categoria !== "all" && (event.categoria?.nombre ?? "") !== filters.categoria) return false;
      if (filters.estado !== "all" && (event.estado ?? "").toLowerCase() !== filters.estado.toLowerCase()) return false;
      if (filters.fechaDesde && new Date(event.fechaInicio) < new Date(filters.fechaDesde)) return false;
      if (filters.fechaHasta && new Date(event.fechaInicio) > new Date(filters.fechaHasta)) return false;
      if (filters.ubicacion !== "all" && (event.ubicacion?.direccion ?? "") !== filters.ubicacion) return false;
      if (filters.precioMin && event.precio < parseFloat(filters.precioMin)) return false;
      if (filters.precioMax && event.precio > parseFloat(filters.precioMax)) return false;
      if (filters.palabrasClave) {
        const searchText = `${event.titulo ?? ""} ${event.descripcion ?? ""} ${event.organizador?.nombre ?? ""}`.toLowerCase();
        if (!searchText.includes(filters.palabrasClave.toLowerCase())) return false;
      }
      return true;
    });
  }, [events, filters]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoria !== "all") count++;
    if (filters.estado !== "all") count++;
    if (filters.fechaDesde) count++;
    if (filters.fechaHasta) count++;
    if (filters.ubicacion !== "all") count++;
    if (filters.precioMin) count++;
    if (filters.precioMax) count++;
    if (filters.palabrasClave) count++;
    return count;
  };

  const totalCount = eventsResponse.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const prevPage = () => { if (page > 1) setPage(page - 1); };
  const nextPage = () => { if (page < totalPages) setPage(page + 1); };
  const goToPage = (p: number) => { if (p >= 1 && p <= totalPages) setPage(p); };

  // ---------------------------
  // FORMATTERS
  // ---------------------------
  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", weekday: "long", year: "numeric" }) : "-";
  const formatTime = (d?: string) => d ? new Date(d).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) : "-";
  const formatPrice = (p?: number) => p == null ? "-" : p === 0 ? "Gratis" : new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(p);
  const formatDuration = (dur?: { horas: number; minutos: number }) => {
    if (!dur) return "-";
    if (dur.horas === 0) return `${dur.minutos} min`;
    if (dur.minutos === 0) return `${dur.horas}h`;
    return `${dur.horas}h ${dur.minutos}min`;
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-bold text-5xl">Próximos Eventos</h1>
          <p className="mx-auto max-w-2xl text-blue-100 text-xl">
            Únete a nosotros en estas increíbles experiencias de aprendizaje y networking
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filtros */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={filters.palabrasClave}
                onChange={e => updateFilter("palabrasClave", e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition-colors hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" /> Filtros avanzados
                {getActiveFiltersCount() > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-black text-xs">{getActiveFiltersCount()}</span>
                )}
              </button>

              {getActiveFiltersCount() > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600"
                >
                  <X className="h-4 w-4" /> Limpiar filtros
                </button>
              )}
            </div>

            {/* Panel de filtros */}
            {showFilters && (
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Categoría</label>
                    <select
                      value={filters.categoria}
                      onChange={e => updateFilter("categoria", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Ubicación</label>
                    <select
                      value={filters.ubicacion}
                      onChange={e => updateFilter("ubicacion", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Estado</label>
                    <select
                      value={filters.estado}
                      onChange={e => updateFilter("estado", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Todos</option>
                      <option value="activo">Activos</option>
                      <option value="cancelado">Cancelados</option>
                      <option value="finalizado">Finalizados</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Fecha desde</label>
                    <input type="date" value={filters.fechaDesde} onChange={e => updateFilter("fechaDesde", e.target.value)} className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Fecha hasta</label>
                    <input type="date" value={filters.fechaHasta} onChange={e => updateFilter("fechaHasta", e.target.value)} className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Precio mínimo (ARS)</label>
                    <input type="number" placeholder="0" value={filters.precioMin} onChange={e => updateFilter("precioMin", e.target.value)} className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">Precio máximo (ARS)</label>
                    <input type="number" placeholder="Sin límite" value={filters.precioMax} onChange={e => updateFilter("precioMax", e.target.value)} className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lista de eventos */}
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredEvents.map((event, idx) => {
              const key = event.id ?? `${event.titulo ?? "event"}-${event.fechaInicio ?? ""}-${idx}`;
              return (
                <div key={key} className="hover:-translate-y-1 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="rounded-full bg-black/30 px-3 py-1 font-medium text-sm backdrop-blur-sm">
                        {event.categoria?.nombre ?? "Sin categoría"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="rounded bg-indigo-500 px-2 py-1 font-medium text-white text-xs">
                        Presencial
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 font-bold text-2xl text-gray-900">{event.titulo}</h3>

                    <div className="mb-4 space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(event.fechaInicio)}</div>
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{formatTime(event.fechaInicio)} • {formatDuration(event.duracion as any)}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.ubicacion?.direccion ?? "Ubicación no disponible"}</div>
                      <div className="flex items-center gap-2"><Users className="h-4 w-4" />Máximo {event.cupoMaximo ?? "-"} participantes{event.cupoMinimo ? ` • Mínimo ${event.cupoMinimo}` : ""}</div>
                    </div>

                    <p className="mb-4 text-gray-700 text-sm leading-relaxed">{event.descripcion ?? ""}</p>
                    <div className="mb-4 text-gray-500 text-xs">Organizado por <span className="font-medium">{event.organizador?.nombre ?? event.organizador?.email ?? "Organizador"}</span></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1"><DollarSign className="h-5 w-5 text-blue-600" /> <span className="font-bold text-2xl text-blue-600">{formatPrice(event.precio)}</span></div>
                      <div className="flex gap-3">
                        <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-200">Más Info</button>
                        <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700">Inscribirse</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 font-bold text-2xl text-gray-900">No se encontraron eventos</h3>
              <p className="mb-4 text-gray-600">No hay eventos que coincidan con los filtros seleccionados</p>
              <button onClick={clearFilters} className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">Limpiar filtros</button>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={prevPage} disabled={page <= 1 || loadingPage} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50">Anterior</button>
              <div className="hidden gap-2 sm:flex">{Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return <button key={p} onClick={() => goToPage(p)} className={`rounded px-3 py-2 text-sm ${p === page ? "bg-blue-600 text-white" : "bg-white"}`} disabled={loadingPage}>{p}</button>;
              })}</div>
              <button onClick={nextPage} disabled={page >= totalPages || loadingPage} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50">Siguiente</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Página {page} de {totalPages}</div>
              <label className="flex items-center gap-2 text-sm">
                <span>Por página</span>
                <select value={limit} onChange={e => { const l = parseInt(e.target.value, 10); setLimit(l); setPage(1); fetchPage(1, l); }} className="rounded border px-2 py-1">
                  {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
