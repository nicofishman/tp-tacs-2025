import { Markup, type Telegraf } from "telegraf";

export const setUpIntroCommand = (bot: Telegraf) => {
  bot.command("start", (ctx) => {
    ctx.replyWithHTML(
      introMessage(ctx.from?.first_name || "usuario"),
      Markup.keyboard([["/login", "/registrarme"], ["/ayuda"]])
        .resize()
        .oneTime(),
    );
  });
};

const introMessage = (
  name: string,
) => `<b>👋 ¡Bienvenido ${name} a EventFlow!</b>
Gestioná y descubrí eventos con cupos, waitlist automática y métricas en tiempo real.

Elegí una opción para continuar:
• 🔐 <b>Iniciar sesión</b> si ya tenés cuenta
• 🆕 <b>Registrarme</b> si es tu primera vez
• ❓ <b>Ayuda</b> para ver los comandos

<i>Tip:</i> podés usar /help en cualquier momento.`;
