import type { Context } from "telegraf";
import { selectRolButtons } from "../menus/auth-keyboards";
import {
  authButtons,
  cancelButton,
  mainMenu,
  organizadorMenu,
} from "../menus/keyboards";
import { sessionManager } from "../utils/session";

// Estado para manejar el flujo de autenticación
const authState = new Map<
  number,
  | "signin_email"
  | "signin_password"
  | "signup_email"
  | "signup_password"
  | "signup_nombre"
  | "signup_rol"
>();

export async function handleSignIn(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  authState.set(userId, "signin_email");
  await ctx.reply("🔐 *Iniciar Sesión*\n\nPor favor, ingresa tu email:", {
    parse_mode: "Markdown",
    ...cancelButton,
  });
}

export async function handleSignUp(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  authState.set(userId, "signup_email");
  await ctx.reply("📝 *Registrarse*\n\nPor favor, ingresa tu email:", {
    parse_mode: "Markdown",
    ...cancelButton,
  });
}

// Handler para manejar los mensajes de texto durante la autenticación
const authData = new Map<
  number,
  { email?: string; password?: string; nombre?: string; rol?: string }
>();

export async function handleAuthText(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId || !ctx.message || !("text" in ctx.message)) return;

  const state = authState.get(userId);
  if (!state) return;

  const text = ctx.message.text.trim();

  if (text === "❌ Cancelar" || text.toLowerCase() === "cancelar") {
    authState.delete(userId);
    authData.delete(userId);
    await ctx.reply("Operación cancelada.", authButtons);
    return;
  }

  const data = authData.get(userId) || {};

  switch (state) {
    case "signin_email":
    case "signup_email":
      // Validar email basico
      if (!text.includes("@") || !text.includes(".")) {
        await ctx.reply(
          "❌ *Email inválido*\n\n" +
            "Por favor, ingresa un email válido:\n\n" +
            "💡 Ejemplo: usuario@ejemplo.com",
          { parse_mode: "Markdown" },
        );
        return;
      }
      data.email = text;
      authData.set(userId, data);
      if (state === "signin_email") {
        authState.set(userId, "signin_password");
        await ctx.reply(
          "✅ Email recibido\n\n" +
            "2️⃣ Ahora ingresa tu contraseña:\n\n" +
            "🔒 Tu contraseña es privada y segura",
          { parse_mode: "Markdown" },
        );
      } else {
        authState.set(userId, "signup_nombre");
        await ctx.reply(
          "✅ Email recibido\n\n" +
            "2️⃣ Ingresa tu nombre completo:\n\n" +
            "💡 Ejemplo: Juan Pérez",
          { parse_mode: "Markdown" },
        );
      }
      break;

    case "signup_nombre":
      data.nombre = text;
      authData.set(userId, data);
      authState.set(userId, "signup_rol");
      await ctx.reply(
        "✅ Nombre recibido\n\n" +
          "3️⃣ *Selecciona tu rol:*\n\n" +
          "👤 *Participante* - Puedes inscribirte a eventos\n" +
          "🏗️ *Organizador* - Puedes crear y gestionar eventos\n\n" +
          "Haz clic en el botón del rol que deseas:",
        {
          parse_mode: "Markdown",
          ...selectRolButtons(),
        },
      );
      break;

    case "signin_password":
      // Eliminar el mensaje que contiene la contraseña por seguridad
      if (ctx.message && "message_id" in ctx.message) {
        await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
      }
      if (text.length < 8) {
        await ctx.reply(
          "❌ *Contraseña muy corta*\n\n" +
            "La contraseña debe tener al menos 8 caracteres.\n\n" +
            "Intenta nuevamente:",
          { parse_mode: "Markdown" },
        );
        return;
      }
      await processSignIn(ctx, userId, data.email!, text);
      // Limpiar estado
      authState.delete(userId);
      authData.delete(userId);
      break;

    case "signup_password":
      await handleSignUpPassword(ctx);
      break;
  }
}

async function processSignIn(
  ctx: Context,
  userId: number,
  email: string,
  password: string,
) {
  await ctx.reply("⏳ *Verificando credenciales...*\n\nEspera un momento...", {
    parse_mode: "Markdown",
  });

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      await ctx.reply(
        "❌ *Error al iniciar sesión*\n\n" +
          `${data.error || "Error desconocido"}\n\n` +
          "Verifica tus credenciales e intenta nuevamente.",
        { parse_mode: "Markdown", ...authButtons },
      );
      return;
    }

    if (!data.user) {
      await ctx.reply(
        "❌ Error al iniciar sesión. Intenta nuevamente.",
        authButtons,
      );
      return;
    }

    // Extraer cookies de los headers
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    const cookies = setCookieHeaders.join("; ");

    // Guardar sesión
    sessionManager.set(userId, {
      cookies: cookies || undefined,
      email: data.user.email,
      nombre: data.user.nombre,
      rol: data.user.rol,
      userId: data.user.id,
    });

    const rolTexto =
      data.user.rol === "ORGANIZADOR" ? "🏗️ Organizador" : "👤 Participante";
    await ctx.reply(
      "✅ *¡Sesión iniciada correctamente!*\n\n" +
        "━━━━━━━━━━━━━━━━━━━━\n\n" +
        `👋 ¡Bienvenido, ${data.user.nombre}!\n\n` +
        `📌 Rol: ${rolTexto}\n\n` +
        "Ahora puedes explorar eventos, inscribirte y más.",
      {
        parse_mode: "Markdown",
        ...(data.user.rol === "ORGANIZADOR" ? organizadorMenu : mainMenu),
      },
    );
  } catch (error: any) {
    console.error("Error en sign in:", error);
    await ctx.reply(
      "❌ Error al conectar con el servidor. Intenta más tarde.",
      authButtons,
    );
  }
}

async function processSignUp(
  ctx: Context,
  userId: number,
  email: string,
  password: string,
  nombre: string,
  rol?: string,
) {
  await ctx.reply(
    "⏳ *Creando tu cuenta...*\n\n" +
      "Estamos registrando tus datos. Espera un momento...",
    { parse_mode: "Markdown" },
  );

  try {
    const API_URL = process.env.API_URL || "http://localhost:3000";
    const body: any = { email, nombre, password };
    if (rol) {
      body.rol = rol;
    }

    const response = await fetch(`${API_URL}/auth/sign-up`, {
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      await ctx.reply(
        `❌ Error al registrarse: ${data.error || data.message || "Error desconocido"}`,
        authButtons,
      );
      return;
    }

    // Iniciar sesión automáticamente después del registro
    await processSignIn(ctx, userId, email, password);
  } catch (error: any) {
    console.error("Error en sign up:", error);
    await ctx.reply(
      "❌ Error al conectar con el servidor. Intenta más tarde.",
      authButtons,
    );
  }
}

// Handler para seleccionar rol durante el registro
export async function handleSelectRol(ctx: Context, rol: string) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = authState.get(userId);
  if (state !== "signup_rol") return;

  const data = authData.get(userId);
  if (!data || !data.email || !data.nombre) {
    await ctx.reply("❌ Error: datos de registro no encontrados.", authButtons);
    authState.delete(userId);
    authData.delete(userId);
    return;
  }

  data.rol = rol;
  authData.set(userId, data);
  authState.set(userId, "signup_password");

  const rolTexto = rol === "ORGANIZADOR" ? "🏗️ Organizador" : "👤 Participante";
  await ctx.reply(
    `✅ Rol seleccionado: ${rolTexto}\n\n` +
      "4️⃣ *Ingresa tu contraseña:*\n\n" +
      "🔒 Debe tener mínimo 8 caracteres\n" +
      "💡 Usa una contraseña segura",
    {
      parse_mode: "Markdown",
      ...cancelButton,
    },
  );
}

// Handler para cuando se ingresa la contraseña después de seleccionar rol
export async function handleSignUpPassword(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId || !ctx.message || !("text" in ctx.message)) return;

  const state = authState.get(userId);
  if (state !== "signup_password") return;

  // Eliminar el mensaje que contiene la contraseña por seguridad
  if ("message_id" in ctx.message) {
    await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  }

  const text = ctx.message.text.trim();

  if (text.length < 8) {
    await ctx.reply(
      "❌ *Contraseña muy corta*\n\n" +
        "La contraseña debe tener al menos 8 caracteres.\n\n" +
        "Intenta nuevamente:",
      { parse_mode: "Markdown", ...cancelButton },
    );
    return;
  }

  const data = authData.get(userId);
  if (!data || !data.email || !data.nombre) {
    await ctx.reply("❌ Error: datos de registro no encontrados.", authButtons);
    authState.delete(userId);
    authData.delete(userId);
    return;
  }

  // Limpiar estado antes de procesar
  authState.delete(userId);
  const rol = data.rol;
  authData.delete(userId);

  await processSignUp(ctx, userId, data.email, text, data.nombre, rol);
}

export function isInAuthFlow(userId: number): boolean {
  return authState.has(userId);
}

export function cancelAuthFlow(userId: number) {
  authState.delete(userId);
  authData.delete(userId);
}
