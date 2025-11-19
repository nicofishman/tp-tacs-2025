import type { Context } from "telegraf";
import { misEventosButtons, organizadorMenu } from "../menus/keyboards";
import { eventoOrganizadorButtons } from "../menus/organizador-keyboards";
import { sessionManager } from "../utils/session";

export async function handleMisEventos(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  if (session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden ver sus eventos.");
    return;
  }

  await ctx.reply("⏳ Cargando tus eventos...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/me/events`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
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

    const events = await response.json();

    if (events.length === 0) {
      await ctx.reply(
        "📭 *No has creado eventos aún*\n\n" +
          "Aún no has publicado ningún evento.\n\n" +
          "💡 Presiona 'Crear Evento' para publicar tu primer evento y comenzar a recibir inscripciones.",
        { parse_mode: "Markdown", ...organizadorMenu },
      );
      return;
    }

    const eventsText = events
      .map((evento: any, _index: number) => {
        const fechaInicio = new Date(evento.fechaInicio);
        const precioTexto =
          evento.precio === 0 ? "Gratis" : `$${evento.precio}`;
        const estadoEmoji =
          evento.estado === "PENDIENTE"
            ? "⏳"
            : evento.estado === "EN_PROCESO"
              ? "🟢"
              : evento.estado === "FINALIZADO"
                ? "✅"
                : "❌";
        return (
          `┌─ *${evento.titulo}*\n` +
          `│ 📅 ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "short", weekday: "short" })}\n` +
          `│ 💰 ${precioTexto}\n` +
          `│ 🏷️ ${evento.categoria.nombre}\n` +
          `└─ ${estadoEmoji} Estado: ${evento.estado}`
        );
      })
      .join("\n\n");

    await ctx.reply(
      "🏗️ *Mis Eventos*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `${eventsText}\n\n` +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `_Total: ${events.length} evento(s)_\n\n` +
        "👇 Selecciona un evento para gestionarlo:",
      {
        parse_mode: "Markdown",
        ...misEventosButtons(events),
      },
    );
  } catch (error: any) {
    console.error("Error en handleMisEventos:", error);
    await ctx.reply("❌ Error al cargar eventos. Intenta más tarde.");
  }
}

export async function handleEventoOrganizador(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  if (session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden ver esta información.");
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
    const precioTexto = evento.precio === 0 ? "Gratis" : `$${evento.precio}`;
    const estadoEmoji =
      evento.estado === "PENDIENTE"
        ? "⏳"
        : evento.estado === "EN_PROCESO"
          ? "🟢"
          : evento.estado === "FINALIZADO"
            ? "✅"
            : "❌";

    const eventoText =
      `🎯 *${evento.titulo}*\n\n` +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      `📝 *Descripción:*\n${evento.descripcion}\n\n` +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "📅 *Fecha y Hora:*\n" +
      `   ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "long", weekday: "long", year: "numeric" })}\n` +
      `   🕐 ${fechaInicio.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}\n\n` +
      `⏱️ *Duración:* ${duracion}\n\n` +
      `💰 *Precio:* ${precioTexto}\n\n` +
      "👥 *Cupo:*\n" +
      `   Mínimo: ${evento.cupoMinimo} participantes\n` +
      `   Máximo: ${evento.cupoMaximo} participantes\n\n` +
      `📍 *Ubicación:*\n${evento.ubicacion.direccion}\n\n` +
      `🏷️ *Categoría:* ${evento.categoria.nombre}\n\n` +
      `${estadoEmoji} *Estado:* ${evento.estado}`;

    await ctx.reply(eventoText, {
      parse_mode: "Markdown",
      ...eventoOrganizadorButtons(eventoId, evento.estado),
    });
  } catch (error: any) {
    console.error("Error en handleEventoOrganizador:", error);
    await ctx.reply("❌ Error al cargar el evento. Intenta más tarde.");
  }
}

export async function handleVerParticipantes(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  if (session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden ver los participantes.");
    return;
  }

  await ctx.reply("⏳ Cargando participantes...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(
      `${API_URL}/eventos/${eventoId}/participants`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(session.cookies ? { Cookie: session.cookies } : {}),
        },
        method: "GET",
      },
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      const errorMsg = error.error || "Error desconocido";
      await ctx.answerCbQuery(`❌ ${errorMsg}`);
      if (errorMsg.includes("Autorizado")) {
        await ctx.reply(
          "❌ No estás autorizado para ver los participantes de este evento.",
        );
      }
      return;
    }

    const { participantes, titulo } = await response.json();

    if (!participantes || participantes.length === 0) {
      await ctx.reply(
        "📭 *No hay participantes inscritos*\n\n" +
          `El evento "*${titulo}*" aún no tiene participantes inscritos.\n\n` +
          "💡 Comparte el evento para que más personas se inscriban.",
        {
          parse_mode: "Markdown",
          ...eventoOrganizadorButtons(eventoId, "PENDIENTE"),
        },
      );
      return;
    }

    // Separar participantes confirmados y en waitlist
    const confirmados = participantes.filter(
      (p: any) => p.estado === "CONFIRMADO",
    );
    const waitlist = participantes.filter((p: any) => p.estado === "WAITLIST");

    let participantesText =
      "👥 *Participantes del Evento*\n" +
      `📌 *${titulo}*\n\n` +
      "━━━━━━━━━━━━━━━━━━━━\n\n";

    if (confirmados.length > 0) {
      participantesText +=
        `✅ *Confirmados (${confirmados.length}):*\n\n` +
        confirmados
          .map((participante: any, index: number) => {
            const fechaRegistro = new Date(participante.fechaRegistro);
            return (
              `┌─ ${index + 1}. *${participante.usuario.nombre}*\n` +
              `│ 📧 ${participante.usuario.email}\n` +
              `└─ 📝 Inscrito: ${fechaRegistro.toLocaleDateString("es-AR")}`
            );
          })
          .join("\n\n") +
        "\n\n";
    }

    if (waitlist.length > 0) {
      participantesText +=
        `⏳ *Lista de Espera - Waitlist (${waitlist.length}):*\n\n` +
        waitlist
          .map((participante: any, index: number) => {
            const fechaRegistro = new Date(participante.fechaRegistro);
            return (
              `┌─ ${index + 1}. *${participante.usuario.nombre}*\n` +
              `│ 📧 ${participante.usuario.email}\n` +
              `└─ 📝 En lista desde: ${fechaRegistro.toLocaleDateString("es-AR")}`
            );
          })
          .join("\n\n") +
        "\n\n";
    }

    participantesText +=
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "📊 *Resumen:*\n" +
      `• Total: ${participantes.length} participante(s)\n` +
      `• ✅ Confirmados: ${confirmados.length}\n` +
      `• ⏳ En waitlist: ${waitlist.length}`;

    // Obtener el estado del evento para mostrar botones correctos
    let estado = "PENDIENTE";
    try {
      const eventoResponse = await fetch(`${API_URL}/eventos/${eventoId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      if (eventoResponse.ok) {
        const evento = await eventoResponse.json();
        estado = evento.estado || "PENDIENTE";
      }
    } catch (error) {
      console.error("Error al obtener estado del evento:", error);
    }

    await ctx.reply(participantesText, {
      parse_mode: "Markdown",
      ...eventoOrganizadorButtons(eventoId, estado),
    });
  } catch (error: any) {
    console.error("Error en handleVerParticipantes:", error);
    await ctx.answerCbQuery(
      "❌ Error al cargar participantes. Intenta más tarde.",
    );
  }
}
