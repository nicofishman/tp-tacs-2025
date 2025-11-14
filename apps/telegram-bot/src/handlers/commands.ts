import type { Context } from "telegraf";
import { authButtons, mainMenu, organizadorMenu } from "../menus/keyboards";
import { sessionManager } from "../utils/session";
import { cancelAuthFlow } from "./auth";
import { cancelSearch } from "./buscar-eventos";
import { cancelCreateEvento } from "./create-evento";

export async function handleStart(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);

  if (!session) {
    await ctx.reply(
      "👋 *¡Bienvenido al Bot de Eventos!*\n\n" +
        "Gestiona tus eventos e inscripciones de manera fácil e intuitiva.\n\n" +
        "📋 *Para comenzar:*\n" +
        "• Inicia sesión si ya tienes una cuenta\n" +
        "• O regístrate para crear una nueva cuenta\n\n" +
        "¡Selecciona una opción para continuar! 👇",
      { parse_mode: "Markdown", ...authButtons },
    );
    return;
  }

  // Mostrar botones inline del menú
  const rolTexto =
    session.rol === "ORGANIZADOR" ? "🏗️ Organizador" : "👤 Participante";
  await ctx.reply(
    `👋 *¡Hola, ${session.nombre}!*\n\n` +
      `📌 Rol: ${rolTexto}\n\n` +
      "Selecciona una opción del menú para continuar:",
    {
      parse_mode: "Markdown",
      ...(session.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu),
    },
  );
}

export async function handleHelp(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);

  const helpText = session
    ? "📖 *Guía de Uso del Bot*\n\n" +
      "🔹 *Comandos disponibles:*\n" +
      "• /start - Menú principal\n" +
      "• /help - Mostrar esta ayuda\n" +
      "• /logout - Cerrar sesión\n\n" +
      "🔹 *Funcionalidades principales:*\n" +
      "📅 *Ver Eventos* - Explora todos los eventos disponibles\n" +
      "🔍 *Buscar Eventos* - Filtra eventos por fecha, categoría, precio, etc.\n" +
      "🎫 *Mis Inscripciones* - Consulta tus inscripciones y su estado\n" +
      (session.rol === "ORGANIZADOR"
        ? "➕ *Crear Evento* - Publica un nuevo evento\n" +
          "🏗️ *Mis Eventos* - Gestiona tus eventos como organizador\n"
        : "") +
      "👤 *Mi Perfil* - Información de tu cuenta\n\n" +
      "💡 *Consejo:* Usa los botones para navegar fácilmente. Los botones inline aparecen debajo de cada mensaje."
    : "📖 *Guía de Uso del Bot*\n\n" +
      "Este bot te permite gestionar eventos y tus inscripciones de manera sencilla.\n\n" +
      "🔹 *Para comenzar:*\n" +
      "1️⃣ Presiona 'Registrarme' para crear una cuenta\n" +
      "2️⃣ O 'Iniciar sesión' si ya tienes una cuenta\n\n" +
      "🔹 *Comandos disponibles:*\n" +
      "• /start - Iniciar el bot\n" +
      "• /help - Mostrar esta ayuda\n\n" +
      "¡Una vez dentro podrás explorar eventos, inscribirte y más! 🎉";

  await ctx.reply(helpText, { parse_mode: "Markdown" });
}

export async function handleLogout(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  // Limpiar todos los estados del usuario
  sessionManager.delete(userId);
  cancelCreateEvento(userId);
  cancelSearch(userId);
  cancelAuthFlow(userId);

  await ctx.reply(
    "👋 *Sesión cerrada*\n\n" +
      "Has cerrado sesión correctamente.\n\n" +
      "Todos tus datos de sesión han sido limpiados.\n\n" +
      "¡Esperamos verte pronto! 👋",
    { parse_mode: "Markdown", ...authButtons },
  );
}
