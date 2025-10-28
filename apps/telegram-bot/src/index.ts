import { Telegraf } from "telegraf";
import { registerCommand, setUpLoginCommand } from "./commands/auth";
import { setUpIntroCommand } from "./commands/intro";

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || "");

// Intro
setUpIntroCommand(bot);

// Auth
setUpLoginCommand(bot);

// Acción para el botón "Registrarse"
bot.action("REGISTER", (ctx) => {
  registerCommand(ctx);
});

// Manejo de errores global
bot.catch((err, ctx) => {
  console.error(`Error capturado: ${err}`);
  ctx.reply(
    "Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.",
  );
});

// Manejo del cierre del proceso
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// Lanzar el bot
bot.launch();

console.log("Bot de Telegram iniciado...");
