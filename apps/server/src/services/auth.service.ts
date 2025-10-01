import { RolUsuario } from "@prisma/client";
import { ConflictError } from "@server/exceptions/ConflictError";
import { NotFoundError } from "@server/exceptions/NotFoundError";
import { auth } from "@server/lib/auth";
import { UsuariosRepository } from "@server/repositories/usuarios.repository";
import { APIError } from "better-auth";
import { InternalServerError } from "elysia";

export const AuthService = {
  async signIn({
    email,
    password,
    headers: headersProp,
  }: {
    email: string;
    password: string;
    headers: Record<string, string>;
  }) {
    try {
      const { headers, response } = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        headers: headersProp,
        returnHeaders: true,
      });

      const dbUser = await UsuariosRepository.findById(response.user.id);
      if (!dbUser) {
        throw new NotFoundError("Usuario no encontrado");
      }

      return {
        token: headers,
        user: {
          email: response.user.email,
          id: response.user.id,
          nombre: response.user.name,
          rol: dbUser.rol,
        },
      };
    } catch (error) {
      if (error instanceof APIError) {
        if (error.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
          throw new ConflictError("Email o contraseña incorrectos");
        }
        throw new ConflictError("Error al iniciar sesión");
      }

      throw new InternalServerError("Error al iniciar sesión");
    }
  },
  async signUp({
    email,
    password,
    nombre,
    isAdmin,
  }: {
    email: string;
    password: string;
    nombre: string;
    isAdmin: boolean;
  }) {
    try {
      let rol: RolUsuario;

      if (isAdmin) {
        rol = RolUsuario.ORGANIZADOR;
      } else {
        rol = RolUsuario.PARTICIPANTE;
      }

      const { user, token } = await auth.api.signUpEmail({
        body: {
          email,
          name: nombre,
          password,
          rememberMe: false,
          rol: rol,
        },
      });

      if (!token) {
        throw new ConflictError("Error al registrar usuario");
      }

      const dbUser = await UsuariosRepository.findById(user.id);
      if (!dbUser) {
        throw new NotFoundError("Usuario no encontrado");
      }

      return { ...dbUser, token };
    } catch (error) {
      if (error instanceof APIError) {
        if (error.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          throw new ConflictError("Ya existe un usuario con ese email");
        }
      } else if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError("Error al registrar usuario");
    }
  },
};
