import { Markup } from "telegraf";

// Tipos para filtros de búsqueda
export interface SearchFilters {
  fechaDesde?: string;
  fechaHasta?: string;
  categoriaId?: string;
  categoriaNombre?: string;
  precioMin?: number;
  precioMax?: number;
  palabrasClave?: string;
}

// Crear botones para el menú de búsqueda
export function searchMenuButtons(filters: SearchFilters) {
  const buttons = [];

  // Filtros activos con botones para eliminarlos
  if (
    filters.fechaDesde ||
    filters.fechaHasta ||
    filters.categoriaId ||
    filters.precioMin !== undefined ||
    filters.precioMax !== undefined ||
    filters.palabrasClave
  ) {
    buttons.push([
      Markup.button.callback("📋 Ver Filtros", "search_show_filters"),
    ]);
  }

  // Botones de filtros principales (2 columnas)
  buttons.push([
    Markup.button.callback("📅 Fecha Desde", "search_fecha_desde"),
    Markup.button.callback("📅 Fecha Hasta", "search_fecha_hasta"),
  ]);

  buttons.push([
    Markup.button.callback("🏷️ Categoría", "search_categoria"),
    Markup.button.callback("💰 Precio Mín", "search_precio_min"),
  ]);

  buttons.push([
    Markup.button.callback("💰 Precio Máx", "search_precio_max"),
    Markup.button.callback("🔍 Palabras Clave", "search_palabras"),
  ]);

  // Botones de acción
  buttons.push([Markup.button.callback("🔎 Buscar", "search_execute")]);

  if (
    filters.fechaDesde ||
    filters.fechaHasta ||
    filters.categoriaId ||
    filters.precioMin !== undefined ||
    filters.precioMax !== undefined ||
    filters.palabrasClave
  ) {
    buttons.push([
      Markup.button.callback("🔄 Limpiar Filtros", "search_clear_all"),
    ]);
  }

  buttons.push([Markup.button.callback("🔙 Menú Principal", "main_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para mostrar filtros activos con opción de eliminarlos
export function activeFiltersButtons(filters: SearchFilters) {
  const buttons = [];

  if (filters.fechaDesde) {
    buttons.push([
      Markup.button.callback(
        `❌ Desde: ${filters.fechaDesde}`,
        "search_remove_fecha_desde",
      ),
    ]);
  }

  if (filters.fechaHasta) {
    buttons.push([
      Markup.button.callback(
        `❌ Hasta: ${filters.fechaHasta}`,
        "search_remove_fecha_hasta",
      ),
    ]);
  }

  if (filters.categoriaNombre) {
    buttons.push([
      Markup.button.callback(
        `❌ Categoría: ${filters.categoriaNombre}`,
        "search_remove_categoria",
      ),
    ]);
  }

  if (filters.precioMin !== undefined) {
    buttons.push([
      Markup.button.callback(
        `❌ Precio Mín: $${filters.precioMin}`,
        "search_remove_precio_min",
      ),
    ]);
  }

  if (filters.precioMax !== undefined) {
    buttons.push([
      Markup.button.callback(
        `❌ Precio Máx: $${filters.precioMax}`,
        "search_remove_precio_max",
      ),
    ]);
  }

  if (filters.palabrasClave) {
    buttons.push([
      Markup.button.callback(
        `❌ Palabras: ${filters.palabrasClave.substring(0, 20)}${filters.palabrasClave.length > 20 ? "..." : ""}`,
        "search_remove_palabras",
      ),
    ]);
  }

  buttons.push([Markup.button.callback("🔙 Volver", "search_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para seleccionar categorías
export function categoriasButtons(
  categorias: Array<{ id: string; nombre: string }>,
) {
  const buttons = [];

  // Organizar categorías en filas de 2
  for (let i = 0; i < categorias.length; i += 2) {
    const row = [];
    row.push(
      Markup.button.callback(
        categorias[i].nombre,
        `search_select_categoria_${categorias[i].id}`,
      ),
    );
    if (i + 1 < categorias.length) {
      row.push(
        Markup.button.callback(
          categorias[i + 1].nombre,
          `search_select_categoria_${categorias[i + 1].id}`,
        ),
      );
    }
    buttons.push(row);
  }

  buttons.push([
    Markup.button.callback("❌ Sin Categoría", "search_remove_categoria"),
  ]);

  buttons.push([Markup.button.callback("🔙 Volver", "search_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para resultados de búsqueda
export function searchResultsButtons(
  events: Array<{ id: string; titulo: string }>,
  page: number,
  totalPages: number,
) {
  const buttons = [];

  // Botones de eventos
  events.forEach((event) => {
    buttons.push([Markup.button.callback(event.titulo, `evento_${event.id}`)]);
  });

  // Navegación de páginas
  const navRow = [];
  if (page > 1) {
    navRow.push(
      Markup.button.callback("◀️ Anterior", `search_results_page_${page - 1}`),
    );
  }
  if (page < totalPages) {
    navRow.push(
      Markup.button.callback("▶️ Siguiente", `search_results_page_${page + 1}`),
    );
  }
  if (navRow.length > 0) {
    buttons.push(navRow);
  }

  buttons.push([
    Markup.button.callback("🔙 Nueva Búsqueda", "search_menu"),
    Markup.button.callback("🏠 Menú Principal", "main_menu"),
  ]);

  return Markup.inlineKeyboard(buttons);
}

// Botón para cancelar
export function cancelSearchButton() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("❌ Cancelar", "search_cancel")],
  ]);
}
