import { Markup } from "telegraf";

// Menú principal (botones inline)
export const mainMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback("📅 Ver Eventos", "menu_ver_eventos"),
    Markup.button.callback("🔍 Buscar Eventos", "menu_buscar_eventos"),
  ],
  [
    Markup.button.callback("🎫 Mis Inscripciones", "menu_mis_inscripciones"),
    Markup.button.callback("👤 Mi Perfil", "menu_mi_perfil"),
  ],
  [Markup.button.callback("❓ Ayuda", "menu_ayuda")],
  [Markup.button.callback("🚪 Cerrar Sesión", "menu_logout")],
]);

// Menú para organizadores (botones inline)
export const organizadorMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback("📅 Ver Eventos", "menu_ver_eventos"),
    Markup.button.callback("🔍 Buscar Eventos", "menu_buscar_eventos"),
  ],
  [
    Markup.button.callback("➕ Crear Evento", "menu_crear_evento"),
    Markup.button.callback("🏗️ Mis Eventos", "menu_mis_eventos"),
  ],
  [
    Markup.button.callback("🎫 Mis Inscripciones", "menu_mis_inscripciones"),
    Markup.button.callback("👤 Mi Perfil", "menu_mi_perfil"),
  ],
  [Markup.button.callback("❓ Ayuda", "menu_ayuda")],
  [Markup.button.callback("🚪 Cerrar Sesión", "menu_logout")],
]);

// Botones inline para acciones de eventos
export function eventDetailButtons(eventId: string, isRegistered = false) {
  const buttons = [
    Markup.button.callback("🔙 Volver a Eventos", "eventos_list"),
  ];

  if (isRegistered) {
    buttons.unshift(
      Markup.button.callback("❌ Desinscribirse", `unregister_${eventId}`),
    );
  } else {
    buttons.unshift(
      Markup.button.callback("✅ Inscribirse", `register_${eventId}`),
    );
  }

  return Markup.inlineKeyboard([buttons]);
}

// Botones para navegación de eventos
export function eventosNavigationButtons(page: number, totalPages: number) {
  const buttons = [];

  if (page > 1 && page < totalPages) {
    buttons.push([
      Markup.button.callback("◀️ Anterior", `eventos_page_${page - 1}`),
      Markup.button.callback("▶️ Siguiente", `eventos_page_${page + 1}`),
    ]);
  } else if (page > 1) {
    buttons.push([
      Markup.button.callback("◀️ Anterior", `eventos_page_${page - 1}`),
    ]);
  } else if (page < totalPages) {
    buttons.push([
      Markup.button.callback("▶️ Siguiente", `eventos_page_${page + 1}`),
    ]);
  }

  buttons.push([Markup.button.callback("🔙 Menú Principal", "main_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para lista de eventos
export function eventosListButtons(
  events: Array<{ id: string; titulo: string }>,
) {
  const buttons = events.map((event) => [
    Markup.button.callback(event.titulo, `evento_${event.id}`),
  ]);

  buttons.push([Markup.button.callback("🔙 Menú Principal", "main_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para mis inscripciones
export function inscripcionesButtons(
  inscriptions: Array<{ eventoId: string; evento: { titulo: string } }>,
) {
  const buttons = inscriptions.map((inscription) => [
    Markup.button.callback(
      inscription.evento.titulo,
      `evento_${inscription.eventoId}`,
    ),
  ]);

  buttons.push([Markup.button.callback("🔙 Menú Principal", "main_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para mis eventos (organizador)
export function misEventosButtons(
  events: Array<{ id: string; titulo: string }>,
) {
  const buttons = events.map((event) => [
    Markup.button.callback(event.titulo, `evento_org_${event.id}`),
  ]);

  buttons.push([Markup.button.callback("🔙 Menú Principal", "main_menu")]);

  return Markup.inlineKeyboard(buttons);
}

// Botones de autenticación (botones inline)
export const authButtons = Markup.inlineKeyboard([
  [
    Markup.button.callback("Iniciar sesión", "auth_iniciar_sesion"),
    Markup.button.callback("Registrarme", "auth_registrarme"),
  ],
  [Markup.button.callback("Ayuda", "menu_ayuda")],
]);

// Botón para cancelar operación (inline)
export const cancelButton = Markup.inlineKeyboard([
  [Markup.button.callback("❌ Cancelar", "cancelar_operacion")],
]);
