import type { Context } from "telegraf";
import { authButtons, mainMenu, organizadorMenu } from "../menus/keyboards";
import { sessionManager } from "../utils/session";
import { handleSelectRol, handleSignIn, handleSignUp } from "./auth";
import {
  handleBuscarEventoCategoria,
  handleBuscarEventos,
  handleSearchCallback,
  handleSearchResultsPage,
} from "./buscar-eventos";
import { handleLogout } from "./commands";
import {
  cancelCreateEvento,
  handleCrearEvento,
  handleCreateEventoCategoria,
} from "./create-evento";
import {
  handleEventoDetalle,
  handleRegisterEvento,
  handleUnregisterEvento,
  handleVerEventos,
} from "./eventos";
import {
  cancelEditEvento,
  handleCancelEvento,
  handleConfirmCancelEvento,
  handleConfirmDeleteEvento,
  handleDeleteEvento,
  handleEditCategoriaSelect,
  handleEditEvento,
  handleSelectEditField,
} from "./organizador-eventos";
import {
  handleEventoOrganizador,
  handleMisEventos,
  handleVerParticipantes,
} from "./organizadores";
import { handleMisInscripciones } from "./participantes";

export async function handleCallback(ctx: Context) {
  if (!ctx.callbackQuery || !("data" in ctx.callbackQuery)) return;
  if (!ctx.from) return;

  const data = ctx.callbackQuery.data;
  const userId = ctx.from.id;

  await ctx.answerCbQuery();

  // Menú principal
  if (data === "main_menu") {
    const session = sessionManager.get(userId);
    if (!session) {
      await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
      return;
    }
    await ctx.reply(
      "🏠 Menú Principal\n\nSelecciona una opción:",
      session.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu,
    );
    return;
  }

  // Navegación de eventos
  if (data.startsWith("eventos_page_")) {
    const page = Number.parseInt(data.replace("eventos_page_", ""), 10);
    await handleVerEventos(ctx, page);
    return;
  }

  if (data === "eventos_list") {
    await handleVerEventos(ctx, 1);
    return;
  }

  // Evento de organizador
  if (data.startsWith("evento_org_")) {
    const eventoId = data.replace("evento_org_", "");
    // Limpiar estado de edición si existe
    cancelEditEvento(userId);
    await handleEventoOrganizador(ctx, eventoId);
    return;
  }

  // Detalle de evento
  if (data.startsWith("evento_")) {
    const eventoId = data.replace("evento_", "");
    await handleEventoDetalle(ctx, eventoId);
    return;
  }

  // Inscribirse a evento
  if (data.startsWith("register_")) {
    const eventoId = data.replace("register_", "");
    await handleRegisterEvento(ctx, eventoId);
    return;
  }

  // Desinscribirse de evento
  if (data.startsWith("unregister_")) {
    const eventoId = data.replace("unregister_", "");
    await handleUnregisterEvento(ctx, eventoId);
    return;
  }

  // Ver participantes
  if (data.startsWith("participantes_")) {
    const eventoId = data.replace("participantes_", "");
    await handleVerParticipantes(ctx, eventoId);
    return;
  }

  // Gestión de eventos del organizador
  if (data.startsWith("org_delete_evento_")) {
    const eventoId = data.replace("org_delete_evento_", "");
    await handleDeleteEvento(ctx, eventoId);
    return;
  }

  if (data.startsWith("org_confirm_delete_")) {
    const eventoId = data.replace("org_confirm_delete_", "");
    await handleConfirmDeleteEvento(ctx, eventoId);
    return;
  }

  if (data.startsWith("org_cancel_evento_")) {
    const eventoId = data.replace("org_cancel_evento_", "");
    await handleCancelEvento(ctx, eventoId);
    return;
  }

  if (data.startsWith("org_confirm_cancel_")) {
    const eventoId = data.replace("org_confirm_cancel_", "");
    await handleConfirmCancelEvento(ctx, eventoId);
    return;
  }

  if (data.startsWith("org_edit_evento_")) {
    const eventoId = data.replace("org_edit_evento_", "");
    await handleEditEvento(ctx, eventoId);
    return;
  }

  // Campos de edición
  if (data.startsWith("org_edit_titulo_")) {
    const eventoId = data.replace("org_edit_titulo_", "");
    await handleSelectEditField(ctx, "titulo", eventoId);
    return;
  }

  if (data.startsWith("org_edit_descripcion_")) {
    const eventoId = data.replace("org_edit_descripcion_", "");
    await handleSelectEditField(ctx, "descripcion", eventoId);
    return;
  }

  if (data.startsWith("org_edit_fecha_")) {
    const eventoId = data.replace("org_edit_fecha_", "");
    await handleSelectEditField(ctx, "fecha", eventoId);
    return;
  }

  if (data.startsWith("org_edit_hora_")) {
    const eventoId = data.replace("org_edit_hora_", "");
    await handleSelectEditField(ctx, "hora", eventoId);
    return;
  }

  if (data.startsWith("org_edit_duracion_")) {
    const eventoId = data.replace("org_edit_duracion_", "");
    await handleSelectEditField(ctx, "duracion", eventoId);
    return;
  }

  if (data.startsWith("org_edit_ubicacion_")) {
    const eventoId = data.replace("org_edit_ubicacion_", "");
    await handleSelectEditField(ctx, "ubicacion", eventoId);
    return;
  }

  if (data.startsWith("org_edit_cupo_")) {
    const eventoId = data.replace("org_edit_cupo_", "");
    await handleSelectEditField(ctx, "cupo", eventoId);
    return;
  }

  if (data.startsWith("org_edit_precio_")) {
    const eventoId = data.replace("org_edit_precio_", "");
    await handleSelectEditField(ctx, "precio", eventoId);
    return;
  }

  if (data.startsWith("org_edit_categoria_")) {
    const eventoId = data.replace("org_edit_categoria_", "");
    await handleSelectEditField(ctx, "categoria", eventoId);
    return;
  }

  if (data.startsWith("org_edit_categoria_select")) {
    // Formato: org_edit_categoria_select::${eventoId}::${categoriaId}
    if (data.includes("::")) {
      const partes = data.split("::");
      if (partes.length === 3) {
        const eventoId = partes[1];
        const categoriaId = partes[2];
        await handleEditCategoriaSelect(ctx, categoriaId, eventoId);
      }
    }
    return;
  }

  // Mis eventos
  if (data === "mis_eventos") {
    await handleMisEventos(ctx);
    return;
  }

  // Menú - Ver Eventos
  if (data === "menu_ver_eventos") {
    await handleVerEventos(ctx, 1);
    return;
  }

  // Menú - Mis Inscripciones
  if (data === "menu_mis_inscripciones") {
    const session = sessionManager.get(userId);
    if (!session) {
      await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
      return;
    }
    await handleMisInscripciones(ctx);
    return;
  }

  // Menú - Mi Perfil
  if (data === "menu_mi_perfil") {
    const session = sessionManager.get(userId);
    if (!session) {
      await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
      return;
    }
    await ctx.reply(
      "👤 *Mi Perfil*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `📛 *Nombre:* ${session.nombre}\n\n` +
        `📧 *Email:* ${session.email}\n\n` +
        `${session.rol === "ORGANIZADOR" ? "🏗️" : "👤"} *Rol:* ${session.rol}\n\n` +
        "━━━━━━━━━━━━━━━━━━━━",
      {
        parse_mode: "Markdown",
        ...(session.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu),
      },
    );
    return;
  }

  // Menú - Ayuda
  if (data === "menu_ayuda") {
    const session = sessionManager.get(userId);
    const helpText = session
      ? "ℹ️ *Ayuda del Bot*\n\n" +
        "*Comandos disponibles:*\n" +
        "/start - Menú principal\n" +
        "/help - Mostrar esta ayuda\n" +
        "/logout - Cerrar sesión\n\n" +
        "*Funcionalidades:*\n" +
        "📅 Ver Eventos - Lista todos los eventos disponibles\n" +
        "🎫 Mis Inscripciones - Ver tus inscripciones a eventos\n" +
        (session.rol === "ORGANIZADOR"
          ? "🏗️ Mis Eventos - Ver y gestionar tus eventos como organizador\n"
          : "") +
        "👤 Mi Perfil - Ver información de tu cuenta\n\n" +
        "*Uso:*\n" +
        "Usa los botones del menú para navegar. Los botones inline te permiten realizar acciones rápidas."
      : "ℹ️ *Ayuda del Bot*\n\n" +
        "Este bot te permite gestionar eventos y tus inscripciones.\n\n" +
        "*Para comenzar:*\n" +
        "1. Regístrate con /start\n" +
        "2. O inicia sesión si ya tienes una cuenta\n\n" +
        "*Comandos:*\n" +
        "/start - Iniciar el bot\n" +
        "/help - Mostrar esta ayuda";

    await ctx.reply(helpText, {
      parse_mode: "Markdown",
      ...(session
        ? session.rol === "ORGANIZADOR"
          ? organizadorMenu
          : mainMenu
        : authButtons),
    });
    return;
  }

  // Menú - Mis Eventos (organizador)
  if (data === "menu_mis_eventos") {
    const session = sessionManager.get(userId);
    if (!session) {
      await ctx.reply("❌ Debes iniciar sesión primero. Usa /start");
      return;
    }
    await handleMisEventos(ctx);
    return;
  }

  // Autenticación - Iniciar sesión
  if (data === "auth_iniciar_sesion") {
    await handleSignIn(ctx);
    return;
  }

  // Autenticación - Registrarse
  if (data === "auth_registrarme") {
    await handleSignUp(ctx);
    return;
  }

  // Selección de rol durante registro
  if (data === "auth_rol_participante") {
    await handleSelectRol(ctx, "PARTICIPANTE");
    return;
  }

  if (data === "auth_rol_organizador") {
    await handleSelectRol(ctx, "ORGANIZADOR");
    return;
  }

  // Cancelar operación
  if (data === "cancelar_operacion") {
    // Limpiar todos los estados activos
    cancelCreateEvento(userId);
    cancelEditEvento(userId);
    const session = sessionManager.get(userId);
    if (session) {
      await ctx.reply("✅ Operación cancelada.", {
        parse_mode: "Markdown",
        ...(session.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu),
      });
    } else {
      await ctx.reply("✅ Operación cancelada.", {
        parse_mode: "Markdown",
        ...authButtons,
      });
    }
    return;
  }

  // Crear evento (organizador)
  if (data === "menu_crear_evento") {
    await handleCrearEvento(ctx);
    return;
  }

  // Selección de categoría en creación de evento
  if (data.startsWith("create_evento_categoria_")) {
    const categoriaId = data.replace("create_evento_categoria_", "");
    await handleCreateEventoCategoria(ctx, categoriaId);
    return;
  }

  // Buscar eventos
  if (data === "menu_buscar_eventos") {
    await handleBuscarEventos(ctx);
    return;
  }

  // Callbacks de búsqueda
  if (data.startsWith("search_")) {
    if (data.startsWith("search_select_categoria_")) {
      const categoriaId = data.replace("search_select_categoria_", "");
      await handleBuscarEventoCategoria(ctx, categoriaId);
      return;
    }

    if (data.startsWith("search_results_page_")) {
      const page = Number.parseInt(
        data.replace("search_results_page_", ""),
        10,
      );
      await handleSearchResultsPage(ctx, page, userId);
      return;
    }

    await handleSearchCallback(ctx, data, userId);
    return;
  }

  // Cerrar sesión
  if (data === "menu_logout") {
    await handleLogout(ctx);
    return;
  }

  await ctx.reply("❌ Comando no reconocido.");
}
