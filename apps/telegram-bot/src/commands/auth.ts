import type { Context, Telegraf } from "telegraf";

// Register
export const registerCommand = (_ctx: Context) => {
  // Implementar el flujo de registro si es necesario
};

// Login

interface MyContext extends Context {
  session: {
    step: "awaiting_email" | "awaiting_password";
    email: string;
    password: string;
  };
}

export const setUpLoginCommand = async (bot: Telegraf<MyContext>) => {
  bot.command("LOGIN", (ctx) => {
    ctx.session = { email: "", password: "", step: "awaiting_email" };
    ctx.replyWithHTML(introLoginMessage());
    bot.hears(/.+/, (ctx) => {
      if (ctx.session.step === "awaiting_email") {
        const email = ctx.message.text.trim();
        ctx.session.email = email;
        ctx.session.step = "awaiting_password";
        ctx.replyWithHTML(message2(ctx.session.email));
      } else if (ctx.session.step === "awaiting_password") {
        ctx.session.password = ctx.message.text;
        ctx.replyWithHTML(message3(ctx.session.email, ctx.session.password));
      }
    });
  });
};

const introLoginMessage = () => `<b>🔐 Iniciar sesión</b>

Ingresá tu <b>correo electrónico</b> para continuar 👇  
<i>Ejemplo:</i> <code>usuario@eventflow.io</code>

📩 Si no tenés cuenta, podés crear una con <code>/registrarme</code>
`;

const message2 = (email: string) => `<b>🔑 Perfecto ${email}</b>

Ahora ingresá tu <b>contraseña</b> para completar el inicio de sesión.  
🔒 No la compartas con nadie fuera de este chat.

<i>Ejemplo:</i> <code>MiClaveSegura123</code>`;

const message3 = (email: string, password: string) =>
  `✅ <b>Inicio de sesión exitoso</b>\nBienvenido <b>${email} | ${password}</b> 🎉`;
