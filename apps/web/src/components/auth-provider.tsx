import type { Treaty } from "@elysiajs/eden";
import type { Usuario } from "@server/types";
import { api } from "@web/lib/fetch";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Pick<Usuario, "id" | "nombre" | "email" | "rol"> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nombre: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  serverUser,
}: {
  children: ReactNode;
  serverUser?: Treaty.Data<(typeof api.auth)["sign-in"]["post"]>["user"] | null;
}) {
  const [user, setUser] = useState<
    Treaty.Data<(typeof api.auth)["sign-in"]["post"]>["user"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start (only if no server user provided)
  useEffect(() => {
    if (!serverUser) {
      setIsLoading(true);
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          // If there's an error parsing the stored user data, remove it
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [serverUser]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    console.log(
      import.meta.env.VITE_TE_LA_RE_PONGO,
      process.env.VITE_TE_LA_RE_PONGO,
    );

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

      // Set user data - cookies are automatically handled by the server
      setUser(data.user);

      // Store token and user data in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(data.user));
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

      const { token, ...user } = data;

      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
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
