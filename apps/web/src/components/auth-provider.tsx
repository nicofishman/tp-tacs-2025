import type { Usuario } from "@server/types";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fallback auth provider that works without Better Auth
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start with false for now

  useEffect(() => {
    // For now, we'll start in an unauthenticated state
    // Later, you can integrate with Better Auth once the server is properly set up
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Import auth client dynamically to avoid initialization errors
      const { authClient } = await import("@web/lib/auth-client");
      await authClient.signIn.email({
        email,
        password,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      throw new Error(
        "Sign in failed. Please check your credentials and try again.",
      );
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { authClient } = await import("@web/lib/auth-client");
      await authClient.signUp.email({
        email,
        name,
        password,
      });
    } catch (error) {
      console.error("Sign up error:", error);
      throw new Error("Sign up failed. Please try again.");
    }
  };

  const signOut = async () => {
    try {
      const { authClient } = await import("@web/lib/auth-client");
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setUser(null);
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
