import { EventsFilters } from "@web/components/events/EventsFilters";
import { EventsHeader } from "@web/components/events/EventsHeader";
import { EventsList } from "@web/components/events/EventsList";
import { EventsPagination } from "@web/components/events/EventsPagination";
import { api } from "@web/lib/fetch";
import { Suspense, useState } from "react";
import { Await, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/events";

// Removed unused Evento alias
export type Filters = {
  categoriaId: string | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  limit: number;
  order: "asc" | "desc";
  orderBy: "fechaInicio" | "precio";
  page: number;
  priceMax: number | undefined;
  priceMin: number | undefined;
  q: string | undefined;
};

function parseFiltersFromUrl(url: URL): Filters {
  const sp = url.searchParams;
  const num = (v: string | null) =>
    v && v.trim() !== "" ? Number(v) : undefined;
  const str = (v: string | null) => (v && v.trim() !== "" ? v : undefined);
  const order = sp.get("order") === "desc" ? "desc" : ("asc" as const);
  const orderBy =
    sp.get("orderBy") === "precio" ? "precio" : ("fechaInicio" as const);

  return {
    categoriaId: str(sp.get("categoriaId")),
    dateFrom: str(sp.get("dateFrom")),
    dateTo: str(sp.get("dateTo")),
    limit: num(sp.get("limit")) ?? 10,
    order,
    orderBy,
    page: num(sp.get("page")) ?? 1,
    priceMax: num(sp.get("priceMax")),
    priceMin: num(sp.get("priceMin")),
    q: str(sp.get("q")),
  } satisfies Filters;
}

function filtersToSearchParams(f: Partial<Filters>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const filters = parseFiltersFromUrl(url);

  const headers = { Cookie: request.headers.get("Cookie") || "" };

  const eventsResponse = api.eventos
    .get({ headers, query: filters })
    .then((res) =>
      res.status === 200
        ? res.data
        : { count: 0, items: [], limit: filters.limit, page: filters.page },
    );

  const categories = api.categorias.get({ headers }).then((res) =>
    res.status === 200 && Array.isArray(res.data)
      ? [
          {
            label: "Todas las categorías",
            value: undefined as string | undefined,
          },
        ].concat(res.data.map((c) => ({ label: c.nombre, value: c.id })))
      : [
          {
            label: "Todas las categorías",
            value: undefined as string | undefined,
          },
        ],
  );

  return { categories, eventsResponse, filters };
}

export default function Events({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  // --- Derived from loader ---
  const { eventsResponse, categories, filters } = loaderData;

  // --- Local UI state ---
  const [pendingFilters, setPendingFilters] = useState<Filters>(filters);
  const [showFilters, setShowFilters] = useState(false);

  // --- Helpers ---
  function updatePendingFilter<K extends keyof typeof pendingFilters>(
    key: K,
    value: (typeof pendingFilters)[K],
  ) {
    setPendingFilters((prev) => ({ ...prev, [key]: value }));
  }

  const applyFilters = () => {
    const next = { ...pendingFilters, page: 1 };
    navigate(`/events${filtersToSearchParams(next)}`);
  };

  const clearFilters = () => {
    navigate("/events");
  };

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

  // --- Navigation state ---
  const loadingPage = navigation.state !== "idle";

  // --- Formatters ---
  function formatDate(d?: string) {
    return d
      ? new Date(d).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric",
        })
      : "-";
  }
  function formatTime(d?: string) {
    return d
      ? new Date(d).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
  }
  function formatPrice(p?: number) {
    return p == null
      ? "-"
      : p === 0
        ? "Gratis"
        : new Intl.NumberFormat("es-AR", {
            currency: "ARS",
            style: "currency",
          }).format(p);
  }
  function formatDuration(dur?: { horas?: number; minutos?: number } | null) {
    if (!dur) return "-";
    const { horas = 0, minutos = 0 } = dur;
    if (horas === 0 && minutos === 0) return "-";
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas}h`;
    return `${horas}h ${minutos}min`;
  }

  // --- Data from loader ---

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      <EventsHeader title="Eventos Disponibles" />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <EventsFilters
                categories={[
                  { label: "Todas las categorías", value: undefined },
                ]}
                pendingFilters={pendingFilters}
                updatePendingFilter={updatePendingFilter}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                getActiveFiltersCount={getActiveFiltersCount}
                loadingCategories={true}
              />
            }
          >
            <Await resolve={categories}>
              {(resolvedCategories) => (
                <EventsFilters
                  categories={resolvedCategories}
                  pendingFilters={pendingFilters}
                  updatePendingFilter={updatePendingFilter}
                  applyFilters={applyFilters}
                  clearFilters={clearFilters}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  getActiveFiltersCount={getActiveFiltersCount}
                  loadingCategories={false}
                />
              )}
            </Await>
          </Suspense>
        </div>
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="text-gray-600 text-xl">Cargando eventos...</div>
              </div>
            }
          >
            <Await resolve={eventsResponse}>
              {(resp) => {
                if (!resp) return null;
                const page = resp.page ?? 1;
                const limit = resp.limit ?? 10;
                const totalCount = resp.count ?? 0;
                const totalPages = Math.max(1, Math.ceil(totalCount / limit));
                const events = resp.items || [];

                const go = (nextPage: number, nextLimit = limit) => {
                  const next = { ...filters, limit: nextLimit, page: nextPage };
                  navigate(`/events${filtersToSearchParams(next)}`);
                  window.scrollTo({ behavior: "smooth", top: 0 });
                };
                const prevPage = () => {
                  if (page > 1) go(page - 1);
                };
                const nextPage = () => {
                  if (page < totalPages) go(page + 1);
                };
                const goToPage = (p: number) => {
                  if (p >= 1 && p <= totalPages && p !== page) go(p);
                };
                const changeLimit = (newLimit: number) => {
                  go(1, newLimit);
                };

                return (
                  <>
                    <EventsList
                      events={events}
                      loadingPage={loadingPage}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      formatDuration={formatDuration}
                      formatPrice={formatPrice}
                      mode="events"
                    />
                    {events.length === 0 && !loadingPage && (
                      <div className="py-12 text-center">
                        <div className="mb-4 text-6xl">🔍</div>
                        <h3 className="mb-2 font-bold text-2xl text-gray-900">
                          No se encontraron eventos
                        </h3>
                        <p className="mb-4 text-gray-600">
                          No hay eventos que coincidan con los filtros
                          seleccionados
                        </p>
                        <button
                          type="button"
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
