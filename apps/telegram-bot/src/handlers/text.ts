import type { Context } from "telegraf";
import { authButtons, mainMenu, organizadorMenu } from "../menus/keyboards";
import { sessionManager } from "../utils/session";
import { handleAuthText, isInAuthFlow } from "./auth";
import { handleBuscarEventosText, isInSearchFlow } from "./buscar-eventos";
import { handleCreateEventoText, isInCreateEventoFlow } from "./create-evento";
import {
  handleEditEventoText,
  isInEditEventoFlow,
} from "./organizador-eventos";

export async function handleText(ctx: Context) {
  if (!ctx.message || !("text" in ctx.message)) return;
  if (!ctx.from) return;

  const userId = ctx.from.id;
  const _text = ctx.message.text.trim();

  // Si está en flujo de autenticación, manejar eso primero
  if (isInAuthFlow(userId)) {
    await handleAuthText(ctx);
    return;
  }

  // Si está en flujo de creación de evento
  if (isInCreateEventoFlow(userId)) {
    await handleCreateEventoText(ctx);
    return;
  }

  // Si está en flujo de edición de evento
  if (isInEditEventoFlow(userId)) {
    await handleEditEventoText(ctx);
    return;
  }

  // Si está en flujo de búsqueda
  if (isInSearchFlow(userId)) {
    await handleBuscarEventosText(ctx);
    return;
  }

  const session = sessionManager.get(userId);

  // Si no está en ningún flujo, solo manejar texto libre o comandos
  if (session) {
    await ctx.reply(
      "💡 Usa los botones del menú para navegar. Escribe /start para ver el menú principal.",
      session.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu,
    );
  } else {
    await ctx.reply(
      "💡 Usa /start para comenzar y ver las opciones disponibles.",
      authButtons,
    );
  }
}
