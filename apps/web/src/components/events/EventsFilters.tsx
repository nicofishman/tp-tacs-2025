import React from "react";

export interface EventsFiltersProps {
  categories: Array<{ label: string; value: string | undefined }>;
  pendingFilters: any;
  updatePendingFilter: (key: string, value: any) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  getActiveFiltersCount: () => number;
  loadingCategories: boolean;
}

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  categories,
  pendingFilters,
  updatePendingFilter,
  applyFilters,
  clearFilters,
  showFilters,
  setShowFilters,
  getActiveFiltersCount,
  loadingCategories,
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors hover:bg-gray-50"
        >
          {/* Icon placeholder */}
          <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" /> Filtros avanzados
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
            {/* Icon placeholder */}
            <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" /> Limpiar filtros
          </button>
        )}
      </div>
      {showFilters && (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium text-gray-700 text-sm">
                Categoría
              </label>
              <select
                value={pendingFilters.categoriaId ?? ""}
                onChange={e => updatePendingFilter("categoriaId", e.target.value || undefined)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                disabled={loadingCategories}
              >
                {categories.map(c => (
                  <option key={c.value ?? "all"} value={c.value ?? ""}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block font-medium text-gray-700 text-sm">
                Fecha desde
              </label>
              <input
                type="date"
                value={pendingFilters.dateFrom ?? ""}
                onChange={e => updatePendingFilter("dateFrom", e.target.value || undefined)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700 text-sm">
                Fecha hasta
              </label>
              <input
                type="date"
                value={pendingFilters.dateTo ?? ""}
                onChange={e => updatePendingFilter("dateTo", e.target.value || undefined)}
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
                value={pendingFilters.priceMin ?? ""}
                onChange={e => updatePendingFilter("priceMin", e.target.value ? Number(e.target.value) : undefined)}
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
                value={pendingFilters.priceMax ?? ""}
                onChange={e => updatePendingFilter("priceMax", e.target.value ? Number(e.target.value) : undefined)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600 border border-gray-300 rounded-lg px-4 py-2"
            >
              {/* Icon placeholder */}
              <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" /> Limpiar filtros
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              {/* Icon placeholder */}
              <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" /> Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
