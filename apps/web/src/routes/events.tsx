
import { useEffect, useMemo, useState } from "react";
import { EventsHeader } from "@web/components/events/EventsHeader";
import { EventsFilters } from "@web/components/events/EventsFilters";
import { EventsList } from "@web/components/events/EventsList";
import { EventsPagination } from "@web/components/events/EventsPagination";
import { api } from "@web/lib/fetch";
import type { Treaty } from "@elysiajs/eden";

type EventosGetResponse = Treaty.Data<typeof api.eventos.get>;
type Evento = EventosGetResponse extends { items: (infer E)[] } ? E : never;

export default function Events() {
  // --- State and hooks ---
  const defaultFilters = {
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
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [pendingFilters, setPendingFilters] = useState(defaultFilters);
  const [events, setEvents] = useState<Evento[]>([]);
  const [eventsResponse, setEventsResponse] = useState<EventosGetResponse | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [categories, setCategories] = useState([{ label: "Todas las categorías", value: undefined }]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // --- Fetch events and categories ---
  useEffect(() => {
    const fetchEvents = async (p, l, isPageChange = false) => {
      try {
        if (isPageChange) setLoadingPage(true);
        else setLoading(true);
        const queryParams = { ...filters, page: p, limit: l };
        const result = await api.eventos.get({ query: queryParams });
        if (result.error || result.status !== 200) throw new Error('Error fetching events');
        const resp = result.data;
        setEventsResponse(resp);
        setEvents(resp.items || []);
        setPage(resp.page ?? p);
        setLimit(resp.limit ?? l);
        if (isPageChange) window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setEventsResponse({ items: [], count: 0, page: p, limit: l });
        setEvents([]);
      } finally {
        setLoading(false);
        setLoadingPage(false);
      }
    };
    fetchEvents(1, 10);
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const result = await api.categorias.get();
        if (result && result.status === 200 && Array.isArray(result.data)) {
          setCategories([
            { label: "Todas las categorías", value: undefined },
            ...result.data.map(cat => ({ label: cat.nombre, value: cat.id })),
          ]);
        }
      } catch {
        setCategories([{ label: "Todas las categorías", value: undefined }]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading && eventsResponse) {
      setPage(1);
      // Refetch events with new filters
      const fetchEvents = async () => {
        setLoading(true);
        const queryParams = { ...filters, page: 1, limit };
        const result = await api.eventos.get({ query: queryParams });
        if (result.error || result.status !== 200) {
          setEvents([]);
          setEventsResponse({ items: [], count: 0, page: 1, limit });
        } else {
          setEvents(result.data.items || []);
          setEventsResponse(result.data);
        }
        setLoading(false);
      };
      fetchEvents();
    }
    // eslint-disable-next-line
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

  // --- Filter helpers ---
  const updatePendingFilter = (key, value) => setPendingFilters(prev => ({ ...prev, [key]: value }));
  const applyFilters = () => setFilters({ ...pendingFilters, page: 1 });
  const clearFilters = () => { setFilters(defaultFilters); setPendingFilters(defaultFilters); };
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

  // --- Pagination helpers ---
  const totalCount = eventsResponse?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const prevPage = () => { if (page > 1) setPage(page - 1); };
  const nextPage = () => { if (page < totalPages) setPage(page + 1); };
  const goToPage = (p) => { if (p >= 1 && p <= totalPages && p !== page) setPage(p); };
  const changeLimit = (newLimit) => { setLimit(newLimit); setPage(1); };

  // --- Formatters ---
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", weekday: "long", year: "numeric" }) : "-";
  const formatTime = (d) => d ? new Date(d).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) : "-";
  const formatPrice = (p) => p == null ? "-" : p === 0 ? "Gratis" : new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(p);
  const formatDuration = (dur) => {
    if (!dur) return "-";
    const { horas = 0, minutos = 0 } = dur;
    if (horas === 0 && minutos === 0) return "-";
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas}h`;
    return `${horas}h ${minutos}min`;
  };

  // --- Filtered events (API already filters) ---
  const filteredEvents = useMemo(() => events, [events]);

  // --- Loading state ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EventsHeader />
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600 text-xl">Cargando eventos...</div>
        </div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      <EventsHeader />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <EventsFilters
            categories={categories}
            pendingFilters={pendingFilters}
            updatePendingFilter={updatePendingFilter}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            getActiveFiltersCount={getActiveFiltersCount}
            loadingCategories={loadingCategories}
          />
        </div>
        <div className="container mx-auto px-4">
          <EventsList
            events={filteredEvents}
            loadingPage={loadingPage}
            formatDate={formatDate}
            formatTime={formatTime}
            formatDuration={formatDuration}
            formatPrice={formatPrice}
          />
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
          {totalPages > 1 && (
            <EventsPagination
              page={page}
              totalPages={totalPages}
              totalCount={totalCount}
              prevPage={prevPage}
              nextPage={nextPage}
              goToPage={goToPage}
              changeLimit={changeLimit}
              limit={limit}
              loadingPage={loadingPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}