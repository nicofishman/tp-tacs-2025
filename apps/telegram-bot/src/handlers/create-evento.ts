import type { Context } from "telegraf";
import { cancelButton, organizadorMenu } from "../menus/keyboards";
import { categoriasButtonsForOrganizador } from "../menus/organizador-keyboards";
import { sessionManager } from "../utils/session";

// Estado para el flujo de creación de eventos
const createEventoState = new Map<
  number,
  | "titulo"
  | "descripcion"
  | "fecha"
  | "hora"
  | "duracion_horas"
  | "duracion_minutos"
  | "ubicacion"
  | "cupo_maximo"
  | "cupo_minimo"
  | "precio"
  | "categoria"
>();

const createEventoData = new Map<
  number,
  {
    titulo?: string;
    descripcion?: string;
    fecha?: string;
    hora?: string;
    duracionHoras?: number;
    duracionMinutos?: number;
    ubicacion?: string;
    cupoMaximo?: number;
    cupoMinimo?: number;
    precio?: number;
    categoriaId?: string;
  }
>();

export async function handleCrearEvento(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden crear eventos.");
    return;
  }

  // Limpiar datos previos
  createEventoState.delete(userId);
  createEventoData.delete(userId);

  createEventoState.set(userId, "titulo");
  await ctx.reply(
    "➕ *Crear Nuevo Evento*\n\n" +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "Vamos a crear tu evento paso a paso. Necesitaremos algunos datos:\n\n" +
      "📋 *Información requerida:*\n" +
      "• Título\n" +
      "• Descripción\n" +
      "• Fecha y hora\n" +
      "• Duración\n" +
      "• Ubicación\n" +
      "• Cupo y precio\n" +
      "• Categoría\n\n" +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "1️⃣ *Ingresa el título del evento:*\n\n" +
      "💡 Ejemplo: Conferencia de Tecnología 2024",
    { parse_mode: "Markdown", ...cancelButton },
  );
}

export async function handleCreateEventoText(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId || !ctx.message || !("text" in ctx.message)) return;

  const state = createEventoState.get(userId);
  if (!state) return;

  const text = ctx.message.text.trim();
  const data = createEventoData.get(userId) || {};

  switch (state) {
    case "titulo":
      if (text.length < 3) {
        await ctx.reply(
          "❌ *Título muy corto*\n\n" +
            "El título debe tener al menos 3 caracteres.\n\n" +
            "Intenta nuevamente:",
          { parse_mode: "Markdown" },
        );
        return;
      }
      data.titulo = text;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "descripcion");
      await ctx.reply(
        "✅ Título guardado\n\n" +
          "2️⃣ *Ingresa la descripción del evento:*\n\n" +
          "💡 Describe qué es el evento, qué aprenderán los participantes, etc.\n" +
          "Mínimo 10 caracteres.",
        { parse_mode: "Markdown" },
      );
      break;

    case "descripcion":
      if (text.length < 10) {
        await ctx.reply(
          "❌ *Descripción muy corta*\n\n" +
            "La descripción debe tener al menos 10 caracteres.\n\n" +
            "Intenta nuevamente:",
          { parse_mode: "Markdown" },
        );
        return;
      }
      data.descripcion = text;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "fecha");
      await ctx.reply(
        "✅ Descripción guardada\n\n" +
          "3️⃣ *Ingresa la fecha del evento:*\n\n" +
          "📅 Formato: DD/MM/YYYY\n\n" +
          "💡 Ejemplo: 25/12/2024",
        { parse_mode: "Markdown" },
      );
      break;

    case "fecha": {
      // Validar formato de fecha
      const fechaMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!fechaMatch) {
        await ctx.reply(
          "❌ Formato de fecha inválido. Usa el formato DD/MM/YYYY:\n" +
            "Ejemplo: 25/12/2024",
        );
        return;
      }
      const [, dia, mes, año] = fechaMatch;
      const fecha = new Date(`${año}-${mes}-${dia}`);
      if (Number.isNaN(fecha.getTime())) {
        await ctx.reply(
          "❌ Fecha inválida. Verifica que la fecha sea correcta:",
        );
        return;
      }
      data.fecha = text;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "hora");
      await ctx.reply(
        "4️⃣ Ingresa la *hora de inicio* (formato: HH:MM):\n" + "Ejemplo: 14:30",
      );
      break;
    }

    case "hora": {
      // Validar formato de hora
      const horaMatch = text.match(/^(\d{1,2}):(\d{2})$/);
      if (!horaMatch) {
        await ctx.reply(
          "❌ Formato de hora inválido. Usa el formato HH:MM:\n" +
            "Ejemplo: 14:30",
        );
        return;
      }
      const [, horas, minutos] = horaMatch;
      if (
        Number.parseInt(horas, 10) > 23 ||
        Number.parseInt(minutos, 10) > 59
      ) {
        await ctx.reply("❌ Hora inválida. Verifica que la hora sea correcta:");
        return;
      }
      data.hora = text;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "duracion_horas");
      await ctx.reply(
        "✅ Hora guardada\n\n" +
          "5️⃣ *Ingresa la duración del evento*\n\n" +
          "Primero, las *horas* (número entero, 0 o más):\n\n" +
          "💡 Ejemplo: 2 (para 2 horas)",
        { parse_mode: "Markdown" },
      );
      break;
    }

    case "duracion_horas": {
      const horasNum = Number.parseInt(text, 10);
      if (Number.isNaN(horasNum) || horasNum < 0) {
        await ctx.reply(
          "❌ *Número inválido*\n\n" +
            "Ingresa un número válido de horas (0 o más):",
          { parse_mode: "Markdown" },
        );
        return;
      }
      data.duracionHoras = horasNum;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "duracion_minutos");
      await ctx.reply(
        "✅ Horas guardadas\n\n" +
          "Ahora, los *minutos* (0-59):\n\n" +
          "💡 Ejemplo: 30 (para 30 minutos)",
        { parse_mode: "Markdown" },
      );
      break;
    }

    case "duracion_minutos": {
      const minutosNum = Number.parseInt(text, 10);
      if (Number.isNaN(minutosNum) || minutosNum < 0 || minutosNum > 59) {
        await ctx.reply(
          "❌ *Número inválido*\n\n" +
            "Ingresa un número válido de minutos (0-59):",
          { parse_mode: "Markdown" },
        );
        return;
      }
      if (data.duracionHoras === 0 && minutosNum === 0) {
        await ctx.reply(
          "❌ *Duración inválida*\n\n" +
            "La duración debe ser mayor a 0.\n\n" +
            "Ingresa los minutos nuevamente:",
          { parse_mode: "Markdown" },
        );
        return;
      }
      data.duracionMinutos = minutosNum;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "ubicacion");
      await ctx.reply(
        "✅ Duración guardada\n\n" +
          "6️⃣ *Ingresa la ubicación del evento:*\n\n" +
          "Puede ser:\n" +
          "• Una dirección física (ej: Av. Corrientes 123, CABA)\n" +
          "• Un enlace online/URL (ej: https://zoom.us/j/123456)",
        { parse_mode: "Markdown" },
      );
      break;
    }

    case "ubicacion":
      if (text.length < 3) {
        await ctx.reply(
          "❌ La ubicación debe tener al menos 3 caracteres. Intenta nuevamente:",
        );
        return;
      }
      data.ubicacion = text;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "cupo_maximo");
      await ctx.reply(
        "7️⃣ Ingresa el *cupo máximo* de participantes (número entero):",
      );
      break;

    case "cupo_maximo": {
      const cupoMax = Number.parseInt(text, 10);
      if (Number.isNaN(cupoMax) || cupoMax < 1) {
        await ctx.reply("❌ El cupo máximo debe ser un número mayor a 0:");
        return;
      }
      data.cupoMaximo = cupoMax;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "cupo_minimo");
      await ctx.reply(
        "8️⃣ Ingresa el *cupo mínimo* (opcional, número entero):\n" +
          "Escribe 0 si no quieres establecer un cupo mínimo.",
      );
      break;
    }

    case "cupo_minimo": {
      const cupoMin = Number.parseInt(text, 10);
      if (Number.isNaN(cupoMin) || cupoMin < 0) {
        await ctx.reply(
          "❌ El cupo mínimo debe ser un número mayor o igual a 0:",
        );
        return;
      }
      if (cupoMin > (data.cupoMaximo || 0)) {
        await ctx.reply(
          `❌ El cupo mínimo no puede ser mayor al cupo máximo (${data.cupoMaximo}). Intenta nuevamente:`,
        );
        return;
      }
      data.cupoMinimo = cupoMin;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "precio");
      await ctx.reply(
        "9️⃣ Ingresa el *precio* del evento (número):\n" +
          "Escribe 0 si el evento es gratuito.",
      );
      break;
    }

    case "precio": {
      const precio = Number.parseFloat(text);
      if (Number.isNaN(precio) || precio < 0) {
        await ctx.reply("❌ El precio debe ser un número mayor o igual a 0:");
        return;
      }
      data.precio = precio;
      createEventoData.set(userId, data);
      createEventoState.set(userId, "categoria");
      // Cargar categorías disponibles
      await loadCategoriasAndAsk(ctx, userId);
      break;
    }
  }
}

// Almacenar categorías cargadas para creación
const categoriasCacheCreate = new Map<
  number,
  Array<{ id: string; nombre: string }>
>();

async function loadCategoriasAndAsk(ctx: Context, userId: number) {
  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/categorias`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      await ctx.reply(
        "❌ Error al cargar categorías. Intenta nuevamente o cancela la operación.",
        cancelButton,
      );
      return;
    }

    const categorias = await response.json();
    if (categorias.length === 0) {
      await ctx.reply(
        "❌ No hay categorías disponibles. Contacta al administrador.",
        cancelButton,
      );
      return;
    }

    // Guardar en caché
    categoriasCacheCreate.set(userId, categorias);

    await ctx.reply(
      "🔟 *Selecciona la categoría del evento:*\n\n" +
        "Haz clic en el botón de la categoría que deseas:",
      {
        parse_mode: "Markdown",
        ...categoriasButtonsForOrganizador(
          categorias,
          "create_evento_categoria",
        ),
      },
    );
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    await ctx.reply(
      "❌ Error al cargar categorías. Intenta nuevamente o cancela la operación.",
      cancelButton,
    );
  }
}

export async function handleCreateEventoCategoria(
  ctx: Context,
  categoriaId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = createEventoState.get(userId);
  if (state && state !== "categoria") {
    await ctx.reply("❌ Error: estado de creación inválido.", cancelButton);
    return;
  }

  try {
    const categorias = categoriasCacheCreate.get(userId) || [];
    const categoria = categorias.find((cat) => cat.id === categoriaId);

    if (!categoria) {
      await ctx.reply("❌ Categoría no encontrada.", cancelButton);
      return;
    }

    const data = createEventoData.get(userId);
    if (!data) {
      await ctx.reply(
        "❌ Error: datos del evento no encontrados.",
        cancelButton,
      );
      return;
    }

    // Verificar que todos los campos necesarios estén presentes
    if (
      !data.titulo ||
      !data.descripcion ||
      !data.fecha ||
      !data.hora ||
      data.duracionHoras === undefined ||
      data.duracionMinutos === undefined ||
      !data.ubicacion ||
      data.cupoMaximo === undefined ||
      data.cupoMinimo === undefined ||
      data.precio === undefined
    ) {
      await ctx.reply(
        "❌ Error: faltan datos del evento. Por favor, comienza el registro nuevamente.",
        cancelButton,
      );
      return;
    }

    data.categoriaId = categoria.id;
    createEventoData.set(userId, data);

    // Limpiar estado antes de crear
    createEventoState.delete(userId);
    categoriasCacheCreate.delete(userId);

    // Crear el evento
    await finalizarCreacionEvento(
      ctx,
      userId,
      data as {
        titulo: string;
        descripcion: string;
        fecha: string;
        hora: string;
        duracionHoras: number;
        duracionMinutos: number;
        ubicacion: string;
        cupoMaximo: number;
        cupoMinimo: number;
        precio: number;
        categoriaId: string;
      },
    );
  } catch (error) {
    console.error("Error al seleccionar categoría:", error);
    await ctx.reply("❌ Error al procesar la categoría.", cancelButton);
  }
}

async function finalizarCreacionEvento(
  ctx: Context,
  userId: number,
  data: {
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string;
    duracionHoras: number;
    duracionMinutos: number;
    ubicacion: string;
    cupoMaximo: number;
    cupoMinimo: number;
    precio: number;
    categoriaId: string;
  },
) {
  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Sesión no encontrada.");
    return;
  }

  await ctx.reply(
    "⏳ *Creando tu evento...*\n\n" +
      "Estamos procesando la información. Espera un momento...",
    { parse_mode: "Markdown" },
  );

  try {
    // Construir fecha completa
    const [dia, mes, año] = data.fecha.split("/");
    const [horas, minutos] = data.hora.split(":");
    const fechaInicio = new Date(
      `${año}-${mes}-${dia}T${horas.padStart(2, "0")}:${minutos}:00`,
    );

    // Determinar si la ubicación es una URL o una dirección
    const esURL =
      data.ubicacion.startsWith("http://") ||
      data.ubicacion.startsWith("https://") ||
      data.ubicacion.startsWith("www.");

    const ubicacion = esURL
      ? {
          direccion: data.ubicacion,
          lat: 0,
          lng: 0,
        }
      : {
          direccion: data.ubicacion,
          lat: 0, // En producción, usar un servicio de geocodificación
          lng: 0,
        };

    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos`, {
      body: JSON.stringify({
        categoriaId: data.categoriaId,
        cupoMaximo: data.cupoMaximo,
        cupoMinimo: data.cupoMinimo || 0,
        descripcion: data.descripcion,
        duracion: {
          horas: data.duracionHoras,
          minutos: data.duracionMinutos,
        },
        fechaInicio: fechaInicio.toISOString(),
        precio: data.precio,
        titulo: data.titulo,
        ubicacion,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "POST",
    });

    const responseData = await response.json();

    if (!response.ok || responseData.error) {
      await ctx.reply(
        `❌ Error al crear el evento: ${responseData.error || "Error desconocido"}`,
        cancelButton,
      );
      return;
    }

    // Limpiar estado
    createEventoState.delete(userId);
    createEventoData.delete(userId);

    const precioTexto = data.precio === 0 ? "Gratis" : `$${data.precio}`;
    await ctx.reply(
      "✅ *¡Evento Creado Exitosamente!*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `🎯 *Título:* ${data.titulo}\n\n` +
        `📅 *Fecha:* ${data.fecha}\n` +
        `🕐 *Hora:* ${data.hora}\n` +
        `⏱️ *Duración:* ${data.duracionHoras}h ${data.duracionMinutos}m\n` +
        `📍 *Ubicación:* ${data.ubicacion}\n` +
        `💰 *Precio:* ${precioTexto}\n\n` +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        "🎉 ¡Tu evento está publicado!\n\n" +
        "💡 Puedes verlo en 'Mis Eventos' y gestionar las inscripciones.",
      {
        parse_mode: "Markdown",
        ...organizadorMenu,
      },
    );
  } catch (error: any) {
    console.error("Error al crear evento:", error);
    await ctx.reply(
      "❌ Error al conectar con el servidor. Intenta más tarde.",
      cancelButton,
    );
  }
}

export function isInCreateEventoFlow(userId: number): boolean {
  return createEventoState.has(userId);
}

export function cancelCreateEvento(userId: number) {
  createEventoState.delete(userId);
  createEventoData.delete(userId);
  categoriasCacheCreate.delete(userId);
}
