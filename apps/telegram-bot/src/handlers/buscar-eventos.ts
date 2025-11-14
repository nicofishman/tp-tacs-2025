import type { Context } from "telegraf";
import {
  activeFiltersButtons,
  cancelSearchButton,
  categoriasButtons,
  type SearchFilters,
  searchMenuButtons,
  searchResultsButtons,
} from "../menus/search-keyboards";
import { sessionManager } from "../utils/session";

// Estado para el flujo de búsqueda
const searchState = new Map<
  number,
  | "inicio"
  | "fecha_desde"
  | "fecha_hasta"
  | "categoria"
  | "precio_min"
  | "precio_max"
  | "palabras_clave"
>();

const searchFilters = new Map<number, SearchFilters>();

// Almacenar categorías cargadas temporalmente
const categoriasCache = new Map<
  number,
  Array<{ id: string; nombre: string }>
>();

export async function handleBuscarEventos(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  // Limpiar filtros previos
  searchState.delete(userId);
  searchFilters.delete(userId);
  categoriasCache.delete(userId);

  searchState.set(userId, "inicio");
  await mostrarMenuBusqueda(ctx, userId);
}

async function mostrarMenuBusqueda(ctx: Context, userId: number) {
  const filters = searchFilters.get(userId) || {};

  const filtersText = [];
  if (filters.fechaDesde) {
    filtersText.push(`📅 *Desde:* ${filters.fechaDesde}`);
  }
  if (filters.fechaHasta) {
    filtersText.push(`📅 *Hasta:* ${filters.fechaHasta}`);
  }
  if (filters.categoriaNombre) {
    filtersText.push(`🏷️ *Categoría:* ${filters.categoriaNombre}`);
  }
  if (filters.precioMin !== undefined) {
    filtersText.push(`💰 *Precio Mín:* $${filters.precioMin}`);
  }
  if (filters.precioMax !== undefined) {
    filtersText.push(`💰 *Precio Máx:* $${filters.precioMax}`);
  }
  if (filters.palabrasClave) {
    filtersText.push(`🔍 *Palabras clave:* ${filters.palabrasClave}`);
  }

  const menuText =
    "🔍 *Búsqueda de Eventos*\n\n" +
    "━━━━━━━━━━━━━━━━━━━━\n\n" +
    (filtersText.length > 0
      ? "*Filtros activos:*\n" +
        filtersText.join("\n") +
        "\n\n━━━━━━━━━━━━━━━━━━━━\n\n"
      : "*Sin filtros activos*\n\n" + "━━━━━━━━━━━━━━━━━━━━\n\n") +
    "Selecciona los filtros que deseas aplicar y luego presiona *Buscar* para ver los resultados.\n\n" +
    "💡 *Tip:* Puedes combinar varios filtros para una búsqueda más específica.";

  await ctx.reply(menuText, {
    parse_mode: "Markdown",
    ...searchMenuButtons(filters),
  });
}

export async function handleBuscarEventosText(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId || !ctx.message || !("text" in ctx.message)) return;

  const state = searchState.get(userId);
  if (!state || state === "inicio") {
    return;
  }

  const text = ctx.message.text.trim();
  if (text.toLowerCase() === "cancelar") {
    searchState.set(userId, "inicio");
    await mostrarMenuBusqueda(ctx, userId);
    return;
  }

  const filters = searchFilters.get(userId) || {};

  switch (state) {
    case "fecha_desde": {
      const fechaMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!fechaMatch) {
        await ctx.reply(
          "❌ *Formato inválido*\n\n" +
            "Por favor, usa el formato DD/MM/YYYY\n" +
            "Ejemplo: 01/12/2024\n\n" +
            "Escribe 'cancelar' para volver al menú.",
          {
            parse_mode: "Markdown",
            ...cancelSearchButton(),
          },
        );
        return;
      }
      filters.fechaDesde = text;
      searchFilters.set(userId, filters);
      searchState.set(userId, "inicio");
      await ctx.reply(`✅ *Filtro agregado*\n\nFecha desde: ${text}`, {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;
    }

    case "fecha_hasta": {
      const fechaMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!fechaMatch) {
        await ctx.reply(
          "❌ *Formato inválido*\n\n" +
            "Por favor, usa el formato DD/MM/YYYY\n" +
            "Ejemplo: 31/12/2024\n\n" +
            "Escribe 'cancelar' para volver al menú.",
          {
            parse_mode: "Markdown",
            ...cancelSearchButton(),
          },
        );
        return;
      }
      filters.fechaHasta = text;
      searchFilters.set(userId, filters);
      searchState.set(userId, "inicio");
      await ctx.reply(`✅ *Filtro agregado*\n\nFecha hasta: ${text}`, {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;
    }

    case "precio_min": {
      const precio = Number.parseFloat(text);
      if (Number.isNaN(precio) || precio < 0) {
        await ctx.reply(
          "❌ *Precio inválido*\n\n" +
            "Por favor, ingresa un número mayor o igual a 0\n" +
            "Ejemplo: 100\n\n" +
            "Escribe 'cancelar' para volver al menú.",
          {
            parse_mode: "Markdown",
            ...cancelSearchButton(),
          },
        );
        return;
      }
      filters.precioMin = precio;
      searchFilters.set(userId, filters);
      searchState.set(userId, "inicio");
      await ctx.reply(`✅ *Filtro agregado*\n\nPrecio mínimo: $${precio}`, {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;
    }

    case "precio_max": {
      const precio = Number.parseFloat(text);
      if (Number.isNaN(precio) || precio < 0) {
        await ctx.reply(
          "❌ *Precio inválido*\n\n" +
            "Por favor, ingresa un número mayor o igual a 0\n" +
            "Ejemplo: 500\n\n" +
            "Escribe 'cancelar' para volver al menú.",
          {
            parse_mode: "Markdown",
            ...cancelSearchButton(),
          },
        );
        return;
      }
      filters.precioMax = precio;
      searchFilters.set(userId, filters);
      searchState.set(userId, "inicio");
      await ctx.reply(`✅ *Filtro agregado*\n\nPrecio máximo: $${precio}`, {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;
    }

    case "palabras_clave": {
      if (text.length < 2) {
        await ctx.reply(
          "❌ *Texto muy corto*\n\n" +
            "Por favor, ingresa al menos 2 caracteres\n\n" +
            "Escribe 'cancelar' para volver al menú.",
          {
            parse_mode: "Markdown",
            ...cancelSearchButton(),
          },
        );
        return;
      }
      filters.palabrasClave = text.toLowerCase();
      searchFilters.set(userId, filters);
      searchState.set(userId, "inicio");
      await ctx.reply(`✅ *Filtro agregado*\n\nPalabras clave: ${text}`, {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;
    }
  }
}

async function cargarCategoriasParaBusqueda(ctx: Context, userId: number) {
  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/categorias`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      await ctx.reply("❌ Error al cargar categorías.", {
        ...searchMenuButtons(searchFilters.get(userId) || {}),
      });
      return;
    }

    const categorias = await response.json();
    if (categorias.length === 0) {
      await ctx.reply("❌ No hay categorías disponibles.", {
        ...searchMenuButtons(searchFilters.get(userId) || {}),
      });
      searchState.set(userId, "inicio");
      return;
    }

    // Guardar categorías en caché
    categoriasCache.set(userId, categorias);

    await ctx.reply(
      "🏷️ *Selecciona una categoría:*\n\n" +
        "Haz clic en el botón de la categoría que deseas filtrar.",
      {
        parse_mode: "Markdown",
        ...categoriasButtons(categorias),
      },
    );
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    await ctx.reply("❌ Error al cargar categorías.", {
      ...searchMenuButtons(searchFilters.get(userId) || {}),
    });
  }
}

export async function handleBuscarEventoCategoria(
  ctx: Context,
  categoriaId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = searchState.get(userId);
  if (state !== "categoria") return;

  try {
    const categorias = categoriasCache.get(userId) || [];
    const categoria = categorias.find((cat) => cat.id === categoriaId);

    if (!categoria) {
      await ctx.reply("❌ Categoría no encontrada.", {
        ...searchMenuButtons(searchFilters.get(userId) || {}),
      });
      return;
    }

    const filters = searchFilters.get(userId) || {};
    filters.categoriaId = categoria.id;
    filters.categoriaNombre = categoria.nombre;
    searchFilters.set(userId, filters);
    searchState.set(userId, "inicio");

    await ctx.reply(`✅ *Filtro agregado*\n\nCategoría: ${categoria.nombre}`, {
      parse_mode: "Markdown",
    });
    await mostrarMenuBusqueda(ctx, userId);
  } catch (error) {
    console.error("Error al seleccionar categoría:", error);
    await ctx.reply("❌ Error al procesar la categoría.", {
      ...searchMenuButtons(searchFilters.get(userId) || {}),
    });
  }
}

async function ejecutarBusqueda(
  ctx: Context,
  userId: number,
  filters: SearchFilters,
  page = 1,
) {
  await ctx.reply("⏳ *Buscando eventos...*\n\nAplicando filtros...", {
    parse_mode: "Markdown",
  });

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const url = new URL(`${API_URL}/eventos`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", "5");

    if (filters.fechaDesde) {
      const [dia, mes, año] = filters.fechaDesde.split("/");
      url.searchParams.set("dateFrom", `${año}-${mes}-${dia}`);
    }
    if (filters.fechaHasta) {
      const [dia, mes, año] = filters.fechaHasta.split("/");
      url.searchParams.set("dateTo", `${año}-${mes}-${dia}`);
    }
    if (filters.categoriaId) {
      url.searchParams.set("categoriaId", filters.categoriaId);
    }
    if (filters.precioMin !== undefined) {
      url.searchParams.set("priceMin", filters.precioMin.toString());
    }
    if (filters.precioMax !== undefined) {
      url.searchParams.set("priceMax", filters.precioMax.toString());
    }
    if (filters.palabrasClave) {
      url.searchParams.set("q", filters.palabrasClave);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      await ctx.reply(
        `❌ *Error al buscar eventos*\n\n${error.error || "Error desconocido"}`,
        {
          parse_mode: "Markdown",
          ...searchMenuButtons(filters),
        },
      );
      return;
    }

    const { items, count, limit, page: currentPage } = await response.json();
    const totalPages = Math.ceil(count / limit);

    if (items.length === 0) {
      await ctx.reply(
        "📭 *No se encontraron eventos*\n\n" +
          "━━━━━━━━━━━━━━━━━━━━\n\n" +
          "No hay eventos que coincidan con los filtros aplicados.\n\n" +
          "💡 *Sugerencias:*\n" +
          "• Intenta modificar o limpiar los filtros\n" +
          "• Busca con menos restricciones\n" +
          "• Verifica las fechas y categorías seleccionadas",
        {
          parse_mode: "Markdown",
          ...searchMenuButtons(filters),
        },
      );
      return;
    }

    const eventosText = items
      .map((evento: any, _index: number) => {
        const fecha = new Date(evento.fechaInicio);
        const precioTexto =
          evento.precio === 0 ? "Gratis" : `$${evento.precio}`;
        return (
          `┌─ *${evento.titulo}*\n` +
          `│ 📅 ${fecha.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "short",
            weekday: "short",
            year: "numeric",
          })}\n` +
          `│ 🕐 ${fecha.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}\n` +
          `│ 💰 ${precioTexto}\n` +
          `│ 📍 ${evento.ubicacion.direccion.substring(0, 40)}${
            evento.ubicacion.direccion.length > 40 ? "..." : ""
          }\n` +
          `│ 🏷️ ${evento.categoria.nombre}\n` +
          `└─ 👥 Cupo: ${evento.cupoMaximo} participantes`
        );
      })
      .join("\n\n");

    await ctx.reply(
      "🔍 *Resultados de la Búsqueda*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `${eventosText}\n\n` +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `_📄 Página ${currentPage} de ${totalPages} | Total: ${count} evento(s)_`,
      {
        parse_mode: "Markdown",
        ...searchResultsButtons(items, currentPage, totalPages),
      },
    );

    // Mantener filtros para navegación de páginas pero salir del estado de búsqueda
    searchFilters.set(userId, filters);
    searchState.delete(userId);
  } catch (error: any) {
    console.error("Error en búsqueda:", error);
    await ctx.reply("❌ Error al buscar eventos. Intenta más tarde.", {
      ...searchMenuButtons(filters),
    });
  }
}

// Exportar funciones para uso en callbacks
export async function handleSearchCallback(
  ctx: Context,
  action: string,
  userId: number,
) {
  const filters = searchFilters.get(userId) || {};

  switch (action) {
    case "search_menu":
      // Restaurar el estado de búsqueda y mostrar el menú (manteniendo filtros)
      searchState.set(userId, "inicio");
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_fecha_desde":
      searchState.set(userId, "fecha_desde");
      await ctx.reply(
        "📅 *Fecha Desde*\n\n" +
          "Ingresa la fecha desde (formato: DD/MM/YYYY)\n" +
          "Ejemplo: 01/12/2024\n\n" +
          "Escribe 'cancelar' para volver al menú.",
        {
          parse_mode: "Markdown",
          ...cancelSearchButton(),
        },
      );
      break;

    case "search_fecha_hasta":
      searchState.set(userId, "fecha_hasta");
      await ctx.reply(
        "📅 *Fecha Hasta*\n\n" +
          "Ingresa la fecha hasta (formato: DD/MM/YYYY)\n" +
          "Ejemplo: 31/12/2024\n\n" +
          "Escribe 'cancelar' para volver al menú.",
        {
          parse_mode: "Markdown",
          ...cancelSearchButton(),
        },
      );
      break;

    case "search_categoria":
      searchState.set(userId, "categoria");
      await cargarCategoriasParaBusqueda(ctx, userId);
      break;

    case "search_precio_min":
      searchState.set(userId, "precio_min");
      await ctx.reply(
        "💰 *Precio Mínimo*\n\n" +
          "Ingresa el precio mínimo (número)\n" +
          "Ejemplo: 100\n\n" +
          "Escribe 'cancelar' para volver al menú.",
        {
          parse_mode: "Markdown",
          ...cancelSearchButton(),
        },
      );
      break;

    case "search_precio_max":
      searchState.set(userId, "precio_max");
      await ctx.reply(
        "💰 *Precio Máximo*\n\n" +
          "Ingresa el precio máximo (número)\n" +
          "Ejemplo: 500\n\n" +
          "Escribe 'cancelar' para volver al menú.",
        {
          parse_mode: "Markdown",
          ...cancelSearchButton(),
        },
      );
      break;

    case "search_palabras":
      searchState.set(userId, "palabras_clave");
      await ctx.reply(
        "🔍 *Palabras Clave*\n\n" +
          "Ingresa las palabras clave para buscar\n" +
          "Ejemplo: música, conferencia, taller\n\n" +
          "Escribe 'cancelar' para volver al menú.",
        {
          parse_mode: "Markdown",
          ...cancelSearchButton(),
        },
      );
      break;

    case "search_execute":
      await ejecutarBusqueda(ctx, userId, filters);
      break;

    case "search_clear_all":
      searchFilters.delete(userId);
      await ctx.reply("✅ *Filtros limpiados*", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_show_filters": {
      const filtersText = [];
      if (filters.fechaDesde) {
        filtersText.push(`📅 Desde: ${filters.fechaDesde}`);
      }
      if (filters.fechaHasta) {
        filtersText.push(`📅 Hasta: ${filters.fechaHasta}`);
      }
      if (filters.categoriaNombre) {
        filtersText.push(`🏷️ Categoría: ${filters.categoriaNombre}`);
      }
      if (filters.precioMin !== undefined) {
        filtersText.push(`💰 Precio Mín: $${filters.precioMin}`);
      }
      if (filters.precioMax !== undefined) {
        filtersText.push(`💰 Precio Máx: $${filters.precioMax}`);
      }
      if (filters.palabrasClave) {
        filtersText.push(`🔍 Palabras: ${filters.palabrasClave}`);
      }

      await ctx.reply(
        "📋 *Filtros Activos*\n\n" +
          filtersText.join("\n") +
          "\n\nHaz clic en un filtro para eliminarlo:",
        {
          parse_mode: "Markdown",
          ...activeFiltersButtons(filters),
        },
      );
      break;
    }

    case "search_remove_fecha_desde":
      delete filters.fechaDesde;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de fecha desde eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_remove_fecha_hasta":
      delete filters.fechaHasta;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de fecha hasta eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_remove_categoria":
      delete filters.categoriaId;
      delete filters.categoriaNombre;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de categoría eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_remove_precio_min":
      delete filters.precioMin;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de precio mínimo eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_remove_precio_max":
      delete filters.precioMax;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de precio máximo eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_remove_palabras":
      delete filters.palabrasClave;
      searchFilters.set(userId, filters);
      await ctx.reply("✅ Filtro de palabras clave eliminado", {
        parse_mode: "Markdown",
      });
      await mostrarMenuBusqueda(ctx, userId);
      break;

    case "search_cancel":
      searchState.delete(userId);
      searchFilters.delete(userId);
      categoriasCache.delete(userId);
      await ctx.reply("❌ Búsqueda cancelada", {
        parse_mode: "Markdown",
      });
      break;
  }
}

export async function handleSearchResultsPage(
  ctx: Context,
  page: number,
  userId: number,
) {
  const filters = searchFilters.get(userId) || {};
  if (Object.keys(filters).length === 0) {
    // Si no hay filtros, volver al menú de búsqueda
    searchState.set(userId, "inicio");
    await mostrarMenuBusqueda(ctx, userId);
    return;
  }
  await ejecutarBusqueda(ctx, userId, filters, page);
}

export function isInSearchFlow(userId: number): boolean {
  return searchState.has(userId);
}

export function cancelSearch(userId: number) {
  searchState.delete(userId);
  searchFilters.delete(userId);
  categoriasCache.delete(userId);
}

export function getSearchFilters(userId: number): SearchFilters | undefined {
  return searchFilters.get(userId);
}
