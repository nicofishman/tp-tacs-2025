// src/routes/events.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, DollarSign, Filter, MapPin, Search, Users, X } from "lucide-react";
import { api } from "@web/lib/fetch";
import type { Treaty } from "@elysiajs/eden";

// Inferimos automáticamente el tipo de respuesta desde treaty:
type EventosResponse = Treaty.Data<ReturnType<typeof api.eventos.get>>;
type Evento = EventosResponse["items"][number];

type EventFilters = {
  categoriaId: string | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  limit: number | undefined;
  order: "asc" | "desc" | undefined;
  orderBy: "fechaInicio" | "precio" | undefined;
  page: number | undefined;
  priceMax: number | undefined;
  priceMin: number | undefined;
  q: string | undefined;
};

 



// ---------------------------
// ✅ CLIENT COMPONENT PRINCIPAL
// ---------------------------
export default function Events() {
  const [filters, setFilters] = useState<EventFilters>({
    categoriaId: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    limit: 10,
    order: "asc",
    orderBy: "fechaInicio",
    page: 1,
    priceMax: undefined,
    priceMin: undefined,
    q: undefined,
  });

  const [eventsResponse, setEventsResponse] = useState<EventosResponse | null>(null);
  const [events, setEvents] = useState<Evento[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);

  // Función para construir query params según la API
  const buildQueryParams = (p: number, l: number) => {
    // Use the filters state directly, but allow override of page/limit
    return {
      ...filters,
      page: p,
      limit: l,
    };
  };

  const fetchEvents = async (p: number, l: number, isPageChange = false) => {
    try {
      if (isPageChange) {
        setLoadingPage(true);
      } else {
        setLoading(true);
      }

      // Enviar query params al API
      const queryParams = buildQueryParams(p, l);
      const result = await api.eventos.get({ 
        query: queryParams 
      });
      
      // Treaty devuelve { data, error, response, status }
      if (result.error || result.status !== 200) {
        console.error('API Error:', result.error, result.status);
        throw new Error('Error fetching events');
      }
      
      const resp = result.data;
      setEventsResponse(resp);
      setEvents(resp.items || []);
      setPage(resp.page ?? p);
      setLimit(resp.limit ?? l);

      if (isPageChange) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setEventsResponse({ items: [], count: 0, page: p, limit: l });
      setEvents([]);
    } finally {
      setLoading(false);
      setLoadingPage(false);
    }
  };

  // Fetch inicial
  useEffect(() => {
    fetchEvents(1, 10);

  }, []);

  // Refetch cuando cambian filtros (resetear a página 1)
  useEffect(() => {
    if (!loading && eventsResponse) {
      setPage(1);
      fetchEvents(1, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.categoriaId,
    filters.dateFrom,
    filters.dateTo,
    filters.priceMin,
    filters.priceMax,
    filters.q,
    filters.order,
    filters.orderBy,
    filters.limit,
    filters.page,
  ]);

  const updateFilter = <T extends keyof EventFilters>(key: T, value: EventFilters[T]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      categoriaId: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      limit: 10,
      order: "asc",
      orderBy: "fechaInicio",
      page: 1,
      priceMax: undefined,
      priceMin: undefined,
      q: undefined,
    });
  };

  // ---------------------------
  // MEMOIZED OPTIONS
  // ---------------------------
  const categories = useMemo(() => {
    if (!events.length) return [{ label: "Todas las categorías", value: undefined }];
    const uniqueCategories = new Map<string, { id: string; nombre: string }>();
    events.forEach(e => {
      if (e.categoria?.id && e.categoria?.nombre) {
        uniqueCategories.set(e.categoria.id, e.categoria);
      }
    });
    return [
      { label: "Todas las categorías", value: undefined },
      ...Array.from(uniqueCategories.values()).map(c => ({ 
        label: c.nombre, 
        value: c.id 
      })),
    ];
  }, [events]);

  // Remove locations filter UI and logic if not needed in new filters

  // Si los filtros se aplican en servidor, esto sería redundante
  // Dejarlo solo si el API no soporta filtros
  const filteredEvents = useMemo(() => {
    return events; // Asumiendo que el API ya filtró
  }, [events]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoriaId) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.priceMin !== undefined) count++;
    if (filters.priceMax !== undefined) count++;
    if (filters.q) count++;
    if (filters.order && filters.order !== "asc") count++;
    if (filters.orderBy && filters.orderBy !== "fechaInicio") count++;
    return count;
  };

  const totalCount = eventsResponse?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchEvents(newPage, limit, true);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchEvents(newPage, limit, true);
    }
  };

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages && p !== page) {
      setPage(p);
      fetchEvents(p, limit, true);
    }
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    fetchEvents(1, newLimit);
  };

  // ---------------------------
  // FORMATTERS
  // ---------------------------
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
          style: "currency",
          currency: "ARS",
        }).format(p);

  const formatDuration = (dur?: { horas?: number; minutos?: number } | null) => {
    if (!dur) return "-";
    const { horas = 0, minutos = 0 } = dur;
    if (horas === 0 && minutos === 0) return "-";
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas}h`;
    return `${horas}h ${minutos}min`;
  };

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 font-bold text-5xl">Próximos Eventos</h1>
            <p className="mx-auto max-w-2xl text-blue-100 text-xl">
              Únete a nosotros en estas increíbles experiencias de aprendizaje y networking
            </p>
          </div>
        </section>
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600 text-xl">Cargando eventos...</div>
        </div>
      </div>
    );
  }

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
                value={filters.q ?? ""}
                onChange={e => updateFilter("q", e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" /> Filtros avanzados
                {getActiveFiltersCount() > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-white text-xs font-medium">
                    {getActiveFiltersCount()}
                  </span>
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
                    <label className="mb-2 block font-medium text-gray-700 text-sm">
                      Categoría
                    </label>
                    <select
                      value={filters.categoriaId ?? ""}
                      onChange={e => updateFilter("categoriaId", e.target.value || undefined)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(c => (
                        <option key={c.value ?? "all"} value={c.value ?? ""}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ubicación filter removed as it's not in EventFilters */}

                  {/* Estado filter removed as it's not in EventFilters */}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">
                      Fecha desde
                    </label>
                    <input
                      type="date"
                      value={filters.dateFrom ?? ""}
                      onChange={e => updateFilter("dateFrom", e.target.value || undefined)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">
                      Fecha hasta
                    </label>
                    <input
                      type="date"
                      value={filters.dateTo ?? ""}
                      onChange={e => updateFilter("dateTo", e.target.value || undefined)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">
                      Precio mínimo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.priceMin ?? ""}
                      onChange={e => updateFilter("priceMin", e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-gray-700 text-sm">
                      Precio máximo (ARS)
                    </label>
                    <input
                      type="number"
                      placeholder="Sin límite"
                      value={filters.priceMax ?? ""}
                      onChange={e => updateFilter("priceMax", e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lista de eventos con loading overlay */}
          <div className="relative">
            {loadingPage && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-gray-600">Cargando...</div>
              </div>
            )}
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredEvents.map((event, idx) => {
                const key = event.id ?? `event-${idx}`;
                return (
                  <div
                    key={key}
                    className="hover:-translate-y-1 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
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
                      <h3 className="mb-3 font-bold text-2xl text-gray-900">
                        {event.titulo}
                      </h3>

                      <div className="mb-4 space-y-2 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.fechaInicio)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {formatTime(event.fechaInicio)} • {formatDuration(event.duracion)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.ubicacion?.direccion ?? "Ubicación no disponible"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Máximo {event.cupoMaximo ?? "-"} participantes
                          {event.cupoMinimo ? ` • Mínimo ${event.cupoMinimo}` : ""}
                        </div>
                      </div>

                      <p className="mb-4 text-gray-700 text-sm leading-relaxed line-clamp-3">
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                          <span className="font-bold text-2xl text-blue-600">
                            {formatPrice(event.precio)}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-200">
                            Más Info
                          </button>
                          <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700">
                            Inscribirse
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empty state */}
          {filteredEvents.length === 0 && !loadingPage && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 font-bold text-2xl text-gray-900">
                No se encontraron eventos
              </h3>
              <p className="mb-4 text-gray-600">
                No hay eventos que coincidan con los filtros seleccionados
              </p>
              <button
                onClick={clearFilters}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={prevPage}
                  disabled={page <= 1 || loadingPage}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <div className="hidden gap-2 sm:flex">
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    // Mostrar solo 5 páginas alrededor de la actual
                    let p = i + 1;
                    if (totalPages > 5) {
                      if (page <= 3) {
                        p = i + 1;
                      } else if (page >= totalPages - 2) {
                        p = totalPages - 4 + i;
                      } else {
                        p = page - 2 + i;
                      }
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`rounded px-3 py-2 text-sm transition-colors ${
                          p === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        disabled={loadingPage}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={nextPage}
                  disabled={page >= totalPages || loadingPage}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Página {page} de {totalPages} ({totalCount} eventos)
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <span>Por página:</span>
                  <select
                    value={limit}
                    onChange={e => changeLimit(parseInt(e.target.value, 10))}
                    className="rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={loadingPage}
                  >
                    {[5, 10, 20, 50].map(n => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}