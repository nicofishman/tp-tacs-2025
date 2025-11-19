import "dotenv/config";
import { Telegraf } from "telegraf";
import { handleCallback } from "./handlers/callbacks";
import { handleHelp, handleLogout, handleStart } from "./handlers/commands";
import { handleText } from "./handlers/text";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error(
    "Error: BOT_TOKEN no está definido en las variables de entorno",
  );
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Manejar errores
bot.catch((err, ctx) => {
  console.error(`Error para el usuario ${ctx.from?.id}:`, err);
  ctx.reply("Ocurrió un error. Por favor, intenta nuevamente.");
});

// Comandos
bot.command("start", handleStart);
bot.command("help", handleHelp);
bot.command("logout", handleLogout);

// Callbacks (botones inline)
bot.on("callback_query", handleCallback);

// Mensajes de texto
bot.on("text", handleText);

// Iniciar el bot
bot
  .launch()
  .then(() => {
    console.log("Bot de Telegram iniciado correctamente");
  })
  .catch((error) => {
    console.error("Error al iniciar el bot:", error);
    process.exit(1);
  });

// Manejar cierre graceful
process.once("SIGINT", () => {
  bot.stop("SIGINT");
  console.log("Bot detenido");
});

process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
  console.log("Bot detenido");
});
