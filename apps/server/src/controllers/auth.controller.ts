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
  }: {
    email: string;
    password: string;
    nombre: string;
  }) {
    return await AuthService.signUp({ email, nombre, password });
  },
};
