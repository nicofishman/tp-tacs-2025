import { Markup } from "telegraf";

// Botones para evento de organizador con opciones de gestión
export function eventoOrganizadorButtons(eventId: string, estado?: string) {
  const buttons = [];

  // Ver participantes siempre disponible
  buttons.push([
    Markup.button.callback("👥 Ver Participantes", `participantes_${eventId}`),
  ]);

  // Opciones de gestión según el estado del evento
  if (estado !== "CANCELADO" && estado !== "FINALIZADO") {
    buttons.push([
      Markup.button.callback("✏️ Editar Evento", `org_edit_evento_${eventId}`),
      Markup.button.callback(
        "❌ Cancelar Evento",
        `org_cancel_evento_${eventId}`,
      ),
    ]);
  }

  buttons.push([
    Markup.button.callback("🗑️ Eliminar Evento", `org_delete_evento_${eventId}`),
  ]);

  buttons.push([
    Markup.button.callback("🔙 Mis Eventos", "mis_eventos"),
    Markup.button.callback("🏠 Menú Principal", "main_menu"),
  ]);

  return Markup.inlineKeyboard(buttons);
}

// Botones para confirmar eliminación
export function confirmDeleteEventoButtons(eventId: string) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ Confirmar", `org_confirm_delete_${eventId}`),
      Markup.button.callback("❌ Cancelar", `evento_org_${eventId}`),
    ],
  ]);
}

// Botones para confirmar cancelación
export function confirmCancelEventoButtons(eventId: string) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ Confirmar", `org_confirm_cancel_${eventId}`),
      Markup.button.callback("❌ Cancelar", `evento_org_${eventId}`),
    ],
  ]);
}

// Botones para selección de categorías (reutilizable)
export function categoriasButtonsForOrganizador(
  categorias: Array<{ id: string; nombre: string }>,
  actionPrefix: string,
  eventoId?: string,
) {
  const buttons = [];

  // Organizar categorías en filas de 2
  for (let i = 0; i < categorias.length; i += 2) {
    const row = [];
    // Usar :: como separador para evitar conflictos con ObjectIds
    const callbackData = eventoId
      ? `${actionPrefix}::${eventoId}::${categorias[i].id}`
      : `${actionPrefix}_${categorias[i].id}`;
    row.push(Markup.button.callback(categorias[i].nombre, callbackData));
    if (i + 1 < categorias.length) {
      const callbackData2 = eventoId
        ? `${actionPrefix}::${eventoId}::${categorias[i + 1].id}`
        : `${actionPrefix}_${categorias[i + 1].id}`;
      row.push(Markup.button.callback(categorias[i + 1].nombre, callbackData2));
    }
    buttons.push(row);
  }

  if (eventoId) {
    buttons.push([
      Markup.button.callback("🔙 Cancelar", `evento_org_${eventoId}`),
    ]);
  } else {
    buttons.push([Markup.button.callback("🔙 Cancelar", "cancelar_operacion")]);
  }

  return Markup.inlineKeyboard(buttons);
}

// Botones para opciones de edición de evento
export function editEventoOptionsButtons(eventId: string) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("📝 Título", `org_edit_titulo_${eventId}`),
      Markup.button.callback(
        "📄 Descripción",
        `org_edit_descripcion_${eventId}`,
      ),
    ],
    [
      Markup.button.callback("📅 Fecha", `org_edit_fecha_${eventId}`),
      Markup.button.callback("🕐 Hora", `org_edit_hora_${eventId}`),
    ],
    [
      Markup.button.callback("⏱️ Duración", `org_edit_duracion_${eventId}`),
      Markup.button.callback("📍 Ubicación", `org_edit_ubicacion_${eventId}`),
    ],
    [
      Markup.button.callback("👥 Cupo", `org_edit_cupo_${eventId}`),
      Markup.button.callback("💰 Precio", `org_edit_precio_${eventId}`),
    ],
    [Markup.button.callback("🏷️ Categoría", `org_edit_categoria_${eventId}`)],
    [Markup.button.callback("🔙 Volver", `evento_org_${eventId}`)],
  ]);
}

// Botón para cancelar edición
export function cancelEditButton(eventId: string) {
  return Markup.inlineKeyboard([
    [Markup.button.callback("❌ Cancelar", `evento_org_${eventId}`)],
  ]);
}
