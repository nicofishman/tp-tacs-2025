import { Markup } from "telegraf";

// Botones para seleccionar rol durante el registro
export function selectRolButtons() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("👤 Participante", "auth_rol_participante"),
      Markup.button.callback("🏗️ Organizador", "auth_rol_organizador"),
    ],
    [Markup.button.callback("❌ Cancelar", "cancelar_operacion")],
  ]);
}
