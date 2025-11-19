import type { Context } from "telegraf";
import { organizadorMenu } from "../menus/keyboards";
import {
  cancelEditButton,
  categoriasButtonsForOrganizador,
  confirmCancelEventoButtons,
  confirmDeleteEventoButtons,
  editEventoOptionsButtons,
  eventoOrganizadorButtons,
} from "../menus/organizador-keyboards";
import { sessionManager } from "../utils/session";

// Estado para edición de eventos
const editEventoState = new Map<
  number,
  | "select_field"
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

const editEventoData = new Map<
  number,
  {
    eventoId?: string;
    field?: string;
    value?: any;
  }
>();

// Almacenar categorías cargadas temporalmente
const categoriasCacheEdit = new Map<
  number,
  Array<{ id: string; nombre: string }>
>();

// Handler para eliminar evento
export async function handleDeleteEvento(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden eliminar eventos.");
    return;
  }

  await ctx.reply(
    "⚠️ *¿Eliminar Evento?*\n\n" +
      "Esta acción no se puede deshacer.\n\n" +
      "Se eliminará permanentemente el evento y todas sus inscripciones.\n\n" +
      "¿Estás seguro de que deseas continuar?",
    {
      parse_mode: "Markdown",
      ...confirmDeleteEventoButtons(eventoId),
    },
  );
}

export async function handleConfirmDeleteEvento(
  ctx: Context,
  eventoId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden eliminar eventos.");
    return;
  }

  await ctx.reply("⏳ Eliminando evento...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      await ctx.reply(
        `❌ Error al eliminar evento: ${error.error || "Error desconocido"}`,
        {
          parse_mode: "Markdown",
          ...organizadorMenu,
        },
      );
      return;
    }

    await ctx.reply(
      "✅ *Evento Eliminado*\n\n" +
        "El evento ha sido eliminado permanentemente.\n\n" +
        "Todas las inscripciones asociadas también fueron eliminadas.",
      {
        parse_mode: "Markdown",
        ...organizadorMenu,
      },
    );
  } catch (error: any) {
    console.error("Error al eliminar evento:", error);
    await ctx.reply("❌ Error al eliminar evento. Intenta más tarde.", {
      ...organizadorMenu,
    });
  }
}

// Handler para cancelar evento
export async function handleCancelEvento(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden cancelar eventos.");
    return;
  }

  await ctx.reply(
    "⚠️ *¿Cancelar Evento?*\n\n" +
      "Al cancelar el evento:\n" +
      "• El estado cambiará a CANCELADO\n" +
      "• Los participantes serán notificados\n" +
      "• El evento ya no aparecerá en búsquedas\n\n" +
      "¿Estás seguro de que deseas cancelar este evento?",
    {
      parse_mode: "Markdown",
      ...confirmCancelEventoButtons(eventoId),
    },
  );
}

export async function handleConfirmCancelEvento(
  ctx: Context,
  eventoId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden cancelar eventos.");
    return;
  }

  await ctx.reply("⏳ Cancelando evento...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      body: JSON.stringify({
        estado: "CANCELADO",
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "PATCH",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      await ctx.reply(
        `❌ Error al cancelar evento: ${error.error || "Error desconocido"}`,
        {
          parse_mode: "Markdown",
          ...organizadorMenu,
        },
      );
      return;
    }

    const evento = await response.json();

    await ctx.reply(
      "✅ *Evento Cancelado*\n\n" +
        `El evento "${evento.titulo}" ha sido cancelado.\n\n` +
        "Los participantes serán notificados sobre la cancelación.",
      {
        parse_mode: "Markdown",
        ...eventoOrganizadorButtons(eventoId, "CANCELADO"),
      },
    );
  } catch (error: any) {
    console.error("Error al cancelar evento:", error);
    await ctx.reply("❌ Error al cancelar evento. Intenta más tarde.", {
      ...organizadorMenu,
    });
  }
}

// Handler para editar evento
export async function handleEditEvento(ctx: Context, eventoId: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden editar eventos.");
    return;
  }

  // Obtener información del evento
  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      await ctx.reply("❌ Error al cargar el evento.");
      return;
    }

    const evento = await response.json();

    await ctx.reply(
      "✏️ *Editar Evento*\n\n" +
        `📌 *${evento.titulo}*\n\n` +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        "Selecciona qué campo deseas editar:",
      {
        parse_mode: "Markdown",
        ...editEventoOptionsButtons(eventoId),
      },
    );
  } catch (error: any) {
    console.error("Error al cargar evento:", error);
    await ctx.reply("❌ Error al cargar el evento.");
  }
}

// Handler para seleccionar campo a editar
export async function handleSelectEditField(
  ctx: Context,
  field: string,
  eventoId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = sessionManager.get(userId);
  if (!session || session.rol !== "ORGANIZADOR") {
    await ctx.reply("❌ Solo los organizadores pueden editar eventos.");
    return;
  }

  editEventoData.set(userId, { eventoId, field });
  editEventoState.set(userId, field as any);

  const messages: Record<string, string> = {
    categoria: "✏️ *Editar Categoría*\n\nCargando categorías...",
    cupo: "✏️ *Editar Cupo*\n\nPrimero, ingresa el cupo máximo (número entero):",
    descripcion:
      "✏️ *Editar Descripción*\n\nIngresa la nueva descripción del evento:",
    duracion:
      "✏️ *Editar Duración*\n\nPrimero, ingresa las horas (número entero):",
    fecha:
      "✏️ *Editar Fecha*\n\nIngresa la nueva fecha (formato: DD/MM/YYYY):\nEjemplo: 25/12/2024",
    hora: "✏️ *Editar Hora*\n\nIngresa la nueva hora (formato: HH:MM):\nEjemplo: 14:30",
    precio:
      "✏️ *Editar Precio*\n\nIngresa el nuevo precio (número):\nEscribe 0 si es gratuito",
    titulo: "✏️ *Editar Título*\n\nIngresa el nuevo título del evento:",
    ubicacion:
      "✏️ *Editar Ubicación*\n\nIngresa la nueva ubicación:\nPuede ser una dirección o URL",
  };

  if (field === "categoria") {
    await cargarCategoriasParaEdicion(ctx, userId, eventoId);
    return;
  }

  await ctx.reply(messages[field] || "Ingresa el nuevo valor:", {
    parse_mode: "Markdown",
    ...cancelEditButton(eventoId),
  });
}

async function cargarCategoriasParaEdicion(
  ctx: Context,
  userId: number,
  eventoId: string,
) {
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
        ...cancelEditButton(eventoId),
      });
      return;
    }

    const categorias = await response.json();
    if (categorias.length === 0) {
      await ctx.reply("❌ No hay categorías disponibles.", {
        ...cancelEditButton(eventoId),
      });
      return;
    }

    categoriasCacheEdit.set(userId, categorias);

    await ctx.reply("✏️ *Selecciona la nueva categoría:*", {
      parse_mode: "Markdown",
      ...categoriasButtonsForOrganizador(
        categorias,
        "org_edit_categoria_select",
        eventoId,
      ),
    });
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    await ctx.reply("❌ Error al cargar categorías.", {
      ...cancelEditButton(eventoId),
    });
  }
}

export async function handleEditCategoriaSelect(
  ctx: Context,
  categoriaId: string,
  eventoId: string,
) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const categorias = categoriasCacheEdit.get(userId) || [];
  const categoria = categorias.find((cat) => cat.id === categoriaId);

  if (!categoria) {
    await ctx.reply("❌ Categoría no encontrada.", {
      ...cancelEditButton(eventoId),
    });
    return;
  }

  await aplicarEdicionEvento(ctx, userId, eventoId, "categoriaId", categoriaId);
}

export async function handleEditEventoText(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId || !ctx.message || !("text" in ctx.message)) return;

  const state = editEventoState.get(userId);
  if (!state || state === "select_field") return;

  const data = editEventoData.get(userId);
  if (!data || !data.eventoId) return;

  const text = ctx.message.text.trim();

  switch (state) {
    case "titulo":
      if (text.length < 3) {
        await ctx.reply("❌ El título debe tener al menos 3 caracteres.", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      await aplicarEdicionEvento(ctx, userId, data.eventoId, "titulo", text);
      break;

    case "descripcion":
      if (text.length < 10) {
        await ctx.reply(
          "❌ La descripción debe tener al menos 10 caracteres.",
          {
            ...cancelEditButton(data.eventoId),
          },
        );
        return;
      }
      await aplicarEdicionEvento(
        ctx,
        userId,
        data.eventoId,
        "descripcion",
        text,
      );
      break;

    case "fecha": {
      const fechaMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!fechaMatch) {
        await ctx.reply(
          "❌ Formato inválido. Usa DD/MM/YYYY:\nEjemplo: 25/12/2024",
          {
            ...cancelEditButton(data.eventoId),
          },
        );
        return;
      }
      const [, _dia, _mes, _año] = fechaMatch;

      await obtenerYActualizarFechaEvento(ctx, userId, data.eventoId, text);
      break;
    }

    case "hora": {
      const horaMatch = text.match(/^(\d{1,2}):(\d{2})$/);
      if (!horaMatch) {
        await ctx.reply("❌ Formato inválido. Usa HH:MM:\nEjemplo: 14:30", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      await obtenerYActualizarHoraEvento(ctx, userId, data.eventoId, text);
      break;
    }

    case "duracion_horas": {
      const horas = Number.parseInt(text, 10);
      if (Number.isNaN(horas) || horas < 0) {
        await ctx.reply("❌ Ingresa un número válido de horas (0 o más):", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      data.value = horas;
      editEventoData.set(userId, data);
      editEventoState.set(userId, "duracion_minutos");
      await ctx.reply("Ahora ingresa los minutos (0-59):", {
        ...cancelEditButton(data.eventoId),
      });
      break;
    }

    case "duracion_minutos": {
      const minutos = Number.parseInt(text, 10);
      if (Number.isNaN(minutos) || minutos < 0 || minutos > 59) {
        await ctx.reply("❌ Ingresa un número válido de minutos (0-59):", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      const horas = data.value || 0;
      if (horas === 0 && minutos === 0) {
        await ctx.reply("❌ La duración debe ser mayor a 0.", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      await aplicarEdicionEvento(ctx, userId, data.eventoId, "duracion", {
        horas,
        minutos,
      });
      break;
    }

    case "ubicacion": {
      if (text.length < 3) {
        await ctx.reply("❌ La ubicación debe tener al menos 3 caracteres.", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      const _esURL =
        text.startsWith("http://") ||
        text.startsWith("https://") ||
        text.startsWith("www.");
      await aplicarEdicionEvento(ctx, userId, data.eventoId, "ubicacion", {
        direccion: text,
        lat: 0,
        lng: 0,
      });
      break;
    }

    case "cupo_maximo": {
      const cupoMax = Number.parseInt(text, 10);
      if (Number.isNaN(cupoMax) || cupoMax < 1) {
        await ctx.reply("❌ El cupo máximo debe ser un número mayor a 0:", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      data.value = cupoMax;
      editEventoData.set(userId, data);
      editEventoState.set(userId, "cupo_minimo");
      await ctx.reply("Ahora ingresa el cupo mínimo (0 o más):", {
        ...cancelEditButton(data.eventoId),
      });
      break;
    }

    case "cupo_minimo": {
      const cupoMin = Number.parseInt(text, 10);
      if (Number.isNaN(cupoMin) || cupoMin < 0) {
        await ctx.reply(
          "❌ El cupo mínimo debe ser un número mayor o igual a 0:",
          {
            ...cancelEditButton(data.eventoId),
          },
        );
        return;
      }
      const cupoMax = data.value || 0;
      if (cupoMin > cupoMax) {
        await ctx.reply(
          `❌ El cupo mínimo no puede ser mayor al cupo máximo (${cupoMax}):`,
          {
            ...cancelEditButton(data.eventoId),
          },
        );
        return;
      }
      // Actualizar ambos campos en una sola llamada
      const session = sessionManager.get(userId);
      if (!session) {
        await ctx.reply("❌ Sesión no encontrada.");
        return;
      }

      await ctx.reply("⏳ Actualizando evento...");

      try {
        const API_URL = process.env.API_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/eventos/${data.eventoId}`, {
          body: JSON.stringify({
            cupoMaximo: cupoMax,
            cupoMinimo: cupoMin,
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(session.cookies ? { Cookie: session.cookies } : {}),
          },
          method: "PATCH",
        });

        if (!response.ok) {
          const error = await response
            .json()
            .catch(() => ({ error: "Error desconocido" }));
          await ctx.reply(
            `❌ Error al actualizar evento: ${error.error || "Error desconocido"}`,
            {
              parse_mode: "Markdown",
              ...organizadorMenu,
            },
          );
          return;
        }

        const evento = await response.json();

        // Limpiar estado
        editEventoState.delete(userId);
        editEventoData.delete(userId);

        await ctx.reply(
          "✅ *Evento Actualizado*\n\n" +
            "El cupo ha sido actualizado exitosamente.\n\n" +
            `📌 *${evento.titulo}*`,
          {
            parse_mode: "Markdown",
            ...eventoOrganizadorButtons(data.eventoId, evento.estado),
          },
        );
      } catch (error: any) {
        console.error("Error al actualizar evento:", error);
        await ctx.reply("❌ Error al actualizar evento. Intenta más tarde.", {
          ...organizadorMenu,
        });
      }
      break;
    }

    case "precio": {
      const precio = Number.parseFloat(text);
      if (Number.isNaN(precio) || precio < 0) {
        await ctx.reply("❌ El precio debe ser un número mayor o igual a 0:", {
          ...cancelEditButton(data.eventoId),
        });
        return;
      }
      await aplicarEdicionEvento(ctx, userId, data.eventoId, "precio", precio);
      break;
    }
  }
}

async function obtenerYActualizarFechaEvento(
  ctx: Context,
  userId: number,
  eventoId: string,
  fechaStr: string,
) {
  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      await ctx.reply("❌ Error al obtener el evento.");
      return;
    }

    const evento = await response.json();
    const fechaActual = new Date(evento.fechaInicio);
    const [dia, mes, año] = fechaStr.split("/");
    const nuevaFecha = new Date(
      `${año}-${mes}-${dia}T${fechaActual.getHours().toString().padStart(2, "0")}:${fechaActual.getMinutes().toString().padStart(2, "0")}:00`,
    );

    await aplicarEdicionEvento(
      ctx,
      userId,
      eventoId,
      "fechaInicio",
      nuevaFecha.toISOString(),
    );
  } catch (error) {
    console.error("Error al actualizar fecha:", error);
    await ctx.reply("❌ Error al actualizar la fecha.");
  }
}

async function obtenerYActualizarHoraEvento(
  ctx: Context,
  userId: number,
  eventoId: string,
  horaStr: string,
) {
  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      await ctx.reply("❌ Error al obtener el evento.");
      return;
    }

    const evento = await response.json();
    const fechaActual = new Date(evento.fechaInicio);
    const [horas, minutos] = horaStr.split(":");
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setHours(
      Number.parseInt(horas, 10),
      Number.parseInt(minutos, 10),
      0,
      0,
    );

    await aplicarEdicionEvento(
      ctx,
      userId,
      eventoId,
      "fechaInicio",
      nuevaFecha.toISOString(),
    );
  } catch (error) {
    console.error("Error al actualizar hora:", error);
    await ctx.reply("❌ Error al actualizar la hora.");
  }
}

async function aplicarEdicionEvento(
  ctx: Context,
  userId: number,
  eventoId: string,
  field: string,
  value: any,
) {
  const session = sessionManager.get(userId);
  if (!session) {
    await ctx.reply("❌ Sesión no encontrada.");
    return;
  }

  await ctx.reply("⏳ Actualizando evento...");

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const updateData: any = {};
    updateData[field] = value;

    const response = await fetch(`${API_URL}/eventos/${eventoId}`, {
      body: JSON.stringify(updateData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(session.cookies ? { Cookie: session.cookies } : {}),
      },
      method: "PATCH",
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Error desconocido" }));
      await ctx.reply(
        `❌ Error al actualizar evento: ${error.error || "Error desconocido"}`,
        {
          parse_mode: "Markdown",
          ...organizadorMenu,
        },
      );
      return;
    }

    const evento = await response.json();

    // Limpiar estado
    editEventoState.delete(userId);
    editEventoData.delete(userId);
    categoriasCacheEdit.delete(userId);

    await ctx.reply(
      "✅ *Evento Actualizado*\n\n" +
        "El campo ha sido actualizado exitosamente.\n\n" +
        `📌 *${evento.titulo}*`,
      {
        parse_mode: "Markdown",
        ...eventoOrganizadorButtons(eventoId, evento.estado),
      },
    );
  } catch (error: any) {
    console.error("Error al actualizar evento:", error);
    await ctx.reply("❌ Error al actualizar evento. Intenta más tarde.", {
      ...organizadorMenu,
    });
  }
}

export function isInEditEventoFlow(userId: number): boolean {
  return editEventoState.has(userId);
}

export function cancelEditEvento(userId: number) {
  editEventoState.delete(userId);
  editEventoData.delete(userId);
  categoriasCacheEdit.delete(userId);
}
