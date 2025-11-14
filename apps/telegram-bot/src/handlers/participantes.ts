import type { Context } from "telegraf";
import { inscripcionesButtons } from "../menus/keyboards";
import { sessionManager } from "../utils/session";

export async function handleMisInscripciones(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
    return;
  }

  if (session.rol !== "PARTICIPANTE" && session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los participantes pueden ver sus inscripciones.");
    return;
  }

  await ctx.reply("⏳ Cargando tus inscripciones...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/me/inscriptions`, {
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
        `❌ Error al cargar inscripciones: ${error.error || "Error desconocido"}`,
      );
      return;
    }

    const inscriptions = await response.json();

    if (inscriptions.length === 0) {
      await ctx.reply(
        "📭 *No tienes inscripciones aún*\n\n" +
          "Aún no te has inscrito a ningún evento.\n\n" +
          "💡 *Sugerencias:*\n" +
          "• Usa 'Ver Eventos' para explorar eventos disponibles\n" +
          "• O 'Buscar Eventos' para filtrar por tus preferencias\n\n" +
          "¡Encuentra el evento perfecto para ti! 🎉",
        { parse_mode: "Markdown" },
      );
      return;
    }

    // Filtrar inscripciones duplicadas por evento, manteniendo solo la más reciente
    const inscriptionsMap = new Map<string, any>();
    for (const inscription of inscriptions) {
      const eventoId = inscription.eventoId || inscription.evento?.id;
      if (!eventoId) continue;

      // Asegurar que eventoId esté presente en el objeto de inscripción
      const normalizedInscription = {
        ...inscription,
        eventoId: eventoId,
      };

      const existingInscription = inscriptionsMap.get(eventoId);
      if (!existingInscription) {
        inscriptionsMap.set(eventoId, normalizedInscription);
      } else {
        // Comparar fechas y mantener la más reciente
        const existingDate = new Date(existingInscription.fechaRegistro);
        const currentDate = new Date(normalizedInscription.fechaRegistro);
        if (currentDate > existingDate) {
          inscriptionsMap.set(eventoId, normalizedInscription);
        }
      }
    }

    // Convertir el Map a array con solo las inscripciones más recientes por evento
    const uniqueInscriptions = Array.from(inscriptionsMap.values());

    // Separar por estado: confirmados, waitlist y canceladas
    const confirmados = uniqueInscriptions.filter(
      (ins: any) => ins.estado === "CONFIRMADO" || !ins.estado,
    );
    const waitlist = uniqueInscriptions.filter(
      (ins: any) => ins.estado === "WAITLIST",
    );
    const canceladas = uniqueInscriptions.filter(
      (ins: any) => ins.estado === "CANCELADO",
    );

    let inscriptionsText = "🎫 *Mis Inscripciones*\n\n";

    if (confirmados.length > 0) {
      inscriptionsText +=
        `✅ *Confirmados (${confirmados.length}):*\n\n` +
        confirmados
          .map((inscription: any, _index: number) => {
            const fechaInicio = new Date(inscription.evento.fechaInicio);
            const fechaRegistro = new Date(inscription.fechaRegistro);
            const precioTexto =
              inscription.evento.precio === 0
                ? "Gratis"
                : `$${inscription.evento.precio}`;
            return (
              `┌─ *${inscription.evento.titulo}*\n` +
              "│ ✅ Estado: Confirmado\n" +
              `│ 📅 ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "short", weekday: "short" })}\n` +
              `│ 💰 ${precioTexto}\n` +
              `│ 🏷️ ${inscription.evento.categoria.nombre}\n` +
              `└─ 📝 Inscrito: ${fechaRegistro.toLocaleDateString("es-AR")}`
            );
          })
          .join("\n\n") +
        "\n\n";
    }

    if (waitlist.length > 0) {
      inscriptionsText +=
        `⏳ *En Waitlist (${waitlist.length}):*\n\n` +
        waitlist
          .map((inscription: any, _index: number) => {
            const fechaInicio = new Date(inscription.evento.fechaInicio);
            const fechaRegistro = new Date(inscription.fechaRegistro);
            const precioTexto =
              inscription.evento.precio === 0
                ? "Gratis"
                : `$${inscription.evento.precio}`;
            return (
              `┌─ *${inscription.evento.titulo}*\n` +
              "│ ⏳ Estado: En lista de espera\n" +
              `│ 📅 ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "short", weekday: "short" })}\n` +
              `│ 💰 ${precioTexto}\n` +
              `│ 🏷️ ${inscription.evento.categoria.nombre}\n` +
              `└─ 📝 En lista desde: ${fechaRegistro.toLocaleDateString("es-AR")}`
            );
          })
          .join("\n\n") +
        "\n\n";
    }

    if (canceladas.length > 0) {
      inscriptionsText +=
        `❌ *Canceladas (${canceladas.length}):*\n\n` +
        canceladas
          .map((inscription: any, _index: number) => {
            const fechaInicio = new Date(inscription.evento.fechaInicio);
            const fechaRegistro = new Date(inscription.fechaRegistro);
            const precioTexto =
              inscription.evento.precio === 0
                ? "Gratis"
                : `$${inscription.evento.precio}`;
            return (
              `┌─ *${inscription.evento.titulo}*\n` +
              "│ ❌ Estado: Cancelado\n" +
              `│ 📅 ${fechaInicio.toLocaleDateString("es-AR", { day: "numeric", month: "short", weekday: "short" })}\n` +
              `│ 💰 ${precioTexto}\n` +
              `│ 🏷️ ${inscription.evento.categoria.nombre}\n` +
              `└─ 📝 Cancelado desde: ${fechaRegistro.toLocaleDateString("es-AR")}`
            );
          })
          .join("\n\n") +
        "\n\n";
    }

    inscriptionsText +=
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      `_Total: ${uniqueInscriptions.length} inscripción(es)_\n` +
      `_${confirmados.length} confirmado(s), ${waitlist.length} en waitlist, ${canceladas.length} cancelada(s)_`;

    await ctx.reply(inscriptionsText, {
      parse_mode: "Markdown",
      ...inscripcionesButtons(uniqueInscriptions),
    });
  } catch (error: any) {
    console.error("Error en handleMisInscripciones:", error);
    await ctx.reply("❌ Error al cargar inscripciones. Intenta más tarde.");
  }
}
