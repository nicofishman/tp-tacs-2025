import { AuthService } from "@server/services/auth.service";

export const AuthController = {
  async signIn({
    email,
    password,
    headers,
  }: {
    email: string;
    password: string;
    headers: Record<string, string>;
  }) {
    return await AuthService.signIn({ email, headers, password });
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
    return await AuthService.signUp({ email, isAdmin, nombre, password });
  },
};
