import type { Context } from "telegraf";
import {
  eventDetailButtons,
  eventosListButtons,
  eventosNavigationButtons,
  mainMenu,
  organizadorMenu,
} from "../menus/keyboards";
import { sessionManager } from "../utils/session";

// Estado para verificar inscripciones
const userEventRegistrations = new Map<number, Set<string>>();

export async function handleVerEventos(ctx: Context, page = 1) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  await ctx.reply("⏳ Cargando eventos...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const url = new URL(`${API_URL}/eventos`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", "5");

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
        `❌ Error al cargar eventos: ${error.error || "Error desconocido"}`,
      );
      return;
    }

    const { items, count, limit, page: currentPage } = await response.json();
    const totalPages = Math.ceil(count / limit);

    if (items.length === 0) {
      await ctx.reply(
        "📭 *No hay eventos disponibles*\n\n" +
          "No se encontraron eventos en este momento.\n\n" +
          "💡 Intenta usar 'Buscar Eventos' para aplicar filtros diferentes.",
        { parse_mode: "Markdown" },
      );
      return;
    }

    // Mostrar lista de eventos
    const eventosText = items
      .map((evento: any, _index: number) => {
        const fecha = new Date(evento.fechaInicio);
        const precioTexto =
          evento.precio === 0 ? "Gratis" : `$${evento.precio}`;
        return (
          `┌─ *${evento.titulo}*\n` +
          `│ 📅 ${fecha.toLocaleDateString("es-AR", { day: "numeric", month: "short", weekday: "short", year: "numeric" })}\n` +
          `│ 🕐 ${fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}\n` +
          `│ 💰 ${precioTexto}\n` +
          `│ 📍 ${evento.ubicacion.direccion.substring(0, 40)}${evento.ubicacion.direccion.length > 40 ? "..." : ""}\n` +
          `│ 🏷️ ${evento.categoria.nombre}\n` +
          `└─ 👥 Cupo: ${evento.cupoMaximo} participantes`
        );
      })
      .join("\n\n");

    await ctx.reply(
      "📅 *Eventos Disponibles*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `${eventosText}\n\n` +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `_📄 Página ${currentPage} de ${totalPages}_`,
      {
        parse_mode: "Markdown",
        ...eventosNavigationButtons(currentPage, totalPages),
      },
    );

    // También mostrar botones para seleccionar eventos
    await ctx.reply("👇 *Selecciona un evento para ver más detalles:*", {
      parse_mode: "Markdown",
      ...eventosListButtons(items),
    });
  } catch (error: any) {
    console.error("Error en handleVerEventos:", error);
    await ctx.reply("❌ Error al cargar eventos. Intenta más tarde.");
  }
}

export async function handleEventoDetalle(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  await ctx.reply("⏳ Cargando detalles del evento...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
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
        `❌ Error al cargar evento: ${error.error || "Error desconocido"}`,
      );
      return;
    }

    const evento = await response.json();
    const fechaInicio = new Date(evento.fechaInicio);
    const duracion = `${evento.duracion.horas}h ${evento.duracion.minutos}m`;

    // Verificar si el usuario está inscrito y su estado
    let isRegistered = false;
    let inscripcionEstado: string | null = null;
    if (session.rol === "PARTICIPANTE" || session.rol === "ORGANIZADOR") {
      try {
        const API_URL = process.env.API_URL || "http://localhost:3000";
        const inscripcionesResponse = await fetch(
          `${API_URL}/me/inscriptions`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(session.cookies ? { Cookie: session.cookies } : {}),
            },
            method: "GET",
          },
        );

        if (inscripcionesResponse.ok) {
          const inscripciones = await inscripcionesResponse.json();
          const inscripcion = inscripciones.find(
            (ins: any) =>
              ins.eventoId === eventoId && ins.estado !== "CANCELADO",
          );
          if (inscripcion) {
            isRegistered = true;
            inscripcionEstado = inscripcion.estado || "CONFIRMADO";
          }
        }
      } catch (error) {
        // Si falla, asumimos que no está inscrito
        console.error("Error al verificar inscripción:", error);
      }
    }

    const estadoInscripcionText = isRegistered
      ? inscripcionEstado === "WAITLIST"
        ? "\n\n⏳ *Tu Estado:* 🟡 En lista de espera (waitlist)\n" +
          "   _Te notificaremos si se libera un lugar_"
        : "\n\n✅ *Tu Estado:* 🟢 Confirmado\n" +
          "   _Estás inscrito y confirmado en el evento_"
      : "";

    const precioTexto =
      evento.precio === 0
        ? "💰 *Precio:* Gratis"
        : `💰 *Precio:* $${evento.precio}`;

    const eventoText =
      `🎯 *${evento.titulo}*\n\n` +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      `📝 *Descripción:*\n${evento.descripcion}\n\n` +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "📅 *Fecha y Hora:*\n" +
      `   ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "long", weekday: "long", year: "numeric" })}\n` +
      `   🕐 ${fechaInicio.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}\n\n` +
      `⏱️ *Duración:* ${duracion}\n\n` +
      `${precioTexto}\n\n` +
      "👥 *Cupo:*\n" +
      `   Mínimo: ${evento.cupoMinimo} participantes\n` +
      `   Máximo: ${evento.cupoMaximo} participantes\n\n` +
      `📍 *Ubicación:*\n${evento.ubicacion.direccion}\n\n` +
      `🏷️ *Categoría:* ${evento.categoria.nombre}\n\n` +
      `👤 *Organizador:* ${evento.organizador.nombre}\n\n` +
      `📊 *Estado:* ${evento.estado}` +
      estadoInscripcionText;

    await ctx.reply(eventoText, {
      parse_mode: "Markdown",
      ...eventDetailButtons(eventoId, isRegistered),
    });
  } catch (error: any) {
    console.error("Error en handleEventoDetalle:", error);
    await ctx.reply("❌ Error al cargar el evento. Intenta más tarde.");
  }
}

export async function handleRegisterEvento(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  if (session.rol !== "PARTICIPANTE" && session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ No tienes permiso para inscribirte a eventos.");
    return;
  }

  await ctx.reply("⏳ Inscribiéndote al evento...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}/register`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const errorMsg = data.error || "Error desconocido";
      await ctx.answerCbQuery(`❌ ${errorMsg}`);
      return;
    }

    // Verificar el estado de la inscripción
    const estadoInscripcion = data.estado || "CONFIRMADO";
    const mensajeInscripcion =
      estadoInscripcion === "WAITLIST"
        ? "⏳ *Inscrito en Waitlist*\n\n" +
          "━━━━━━━━━━━━━━━━━━━━\n\n" +
          "Has sido agregado a la lista de espera (waitlist).\n\n" +
          "📬 Te notificaremos automáticamente si se libera un lugar y quedas confirmado."
        : "✅ *¡Inscripción Exitosa!*\n\n" +
          "━━━━━━━━━━━━━━━━━━━━\n\n" +
          "Estás confirmado en el evento.\n\n" +
          "🎉 ¡Nos vemos en el evento!";

    // Actualizar estado local
    const registrations = userEventRegistrations.get(userId) || new Set();
    registrations.add(eventoId);
    userEventRegistrations.set(userId, registrations);

    await ctx.answerCbQuery(
      estadoInscripcion === "WAITLIST"
        ? "⏳ Agregado a waitlist"
        : "✅ Inscripción exitosa",
    );
    await ctx.reply(mensajeInscripcion, { parse_mode: "Markdown" });
    await handleEventoDetalle(ctx, eventoId);
  } catch (error: any) {
    console.error("Error en handleRegisterEvento:", error);
    await ctx.answerCbQuery("❌ Error al inscribirse. Intenta más tarde.");
  }
}

export async function handleUnregisterEvento(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  await ctx.reply("⏳ *Procesando desinscripción...*\n\nEspera un momento...", {
    parse_mode: "Markdown",
  });

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}/unregister`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const errorMsg = data.error || "Error desconocido";
      await ctx.answerCbQuery(`❌ ${errorMsg}`);
      return;
    }

    // Actualizar estado local
    const registrations = userEventRegistrations.get(userId) || new Set();
    registrations.delete(eventoId);
    userEventRegistrations.set(userId, registrations);

    await ctx.answerCbQuery("✅ Desinscripción exitosa");
    await ctx.reply(
      "✅ *Desinscripción Exitosa*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        "Te has desinscrito del evento correctamente.\n\n" +
        "📍 Tu lugar ha sido liberado.",
      { parse_mode: "Markdown" },
    );

    // Mostrar perfil del usuario
    const currentSession = sessionManager.get(userId);
    if (currentSession) {
      await ctx.reply(
        "👤 *Mi Perfil*\n\n" +
          "━━━━━━━━━━━━━━━━━━━━\n\n" +
          `📛 *Nombre:* ${currentSession.nombre}\n\n` +
          `📧 *Email:* ${currentSession.email}\n\n` +
          `${currentSession.rol === "ORGANIZADOR" ? "🏗️" : "👤"} *Rol:* ${currentSession.rol}\n\n` +
          "━━━━━━━━━━━━━━━━━━━━",
        {
          parse_mode: "Markdown",
          ...(currentSession.rol === "ORGANIZADOR"
            ? organizadorMenu
            : mainMenu),
        },
      );
    }
  } catch (error: any) {
    console.error("Error en handleUnregisterEvento:", error);
    await ctx.answerCbQuery("❌ Error al desinscribirse. Intenta más tarde.");
  }
}
