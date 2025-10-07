import { Outlet } from "react-router";
import { useAuth } from "./auth-provider";
import Loader from "./loader";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  // If we're loading, show loader
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If no user, the middleware should have already redirected
  // But as a fallback, we can show a message or redirect
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-xl">
            No tienes acceso a esta página
          </h2>
          <p className="text-gray-600">
            Por favor, inicie sesión para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
