import { api } from "@web/lib/fetch";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { z } from "zod";

// Local RolUsuario and Usuario types (sync with backend)
export type RolUsuario = "ORGANIZADOR" | "PARTICIPANTE";
export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: RolUsuario;
}

// Inline Zod schemas for responses
const signInResponseSchema = z.object({
  user: z.object({
    email: z.string().email(),
    id: z.string(),
    nombre: z.string(),
    rol: z.enum(["ORGANIZADOR", "PARTICIPANTE"]),
  }),
});
const signUpResponseSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  nombre: z.string(),
  rol: z.enum(["ORGANIZADOR", "PARTICIPANTE"]),
  token: z.string(),
});

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nombre: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await api.auth["sign-in"].post({
        email,
        password,
      });
      if (error) {
        type ErrorValue = { message?: string; summary?: string };
        const value = (error as { value?: ErrorValue })?.value;
        const msg = value?.message || value?.summary || "Sign in failed";
        throw new Error(msg);
      }

      // Validate response using Zod
      const parsed = signInResponseSchema.parse(data);
      const userObj: Usuario = parsed.user;

      setUser(userObj);
      localStorage.setItem(
        "token",
        (data as { token?: string } | undefined)?.token ?? "",
      );
      localStorage.setItem("user", JSON.stringify(userObj));
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nombre: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await api.auth["sign-up"].post({
        email,
        nombre,
        password,
      });
      if (error) {
        type ErrorValue = { message?: string; summary?: string };
        const value = (error as { value?: ErrorValue })?.value;
        const msg = value?.message || value?.summary || "Sign up failed";
        throw new Error(msg);
      }

      // Validate response using Zod
      const parsed = signUpResponseSchema.parse(data);
      const userObj: Usuario = {
        email: parsed.email,
        id: parsed.id,
        nombre: parsed.nombre,
        rol: parsed.rol,
      };

      setUser(userObj);
      localStorage.setItem("token", parsed.token);
      localStorage.setItem("user", JSON.stringify(userObj));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    signUp,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
