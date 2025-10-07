import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./auth-provider";
import Loader from "./loader";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user && location.pathname !== "/sign-in") {
      navigate(`/sign-in?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
      });
    }
  }, [isLoading, user, navigate, location.pathname]);

  // If we're loading, show loader
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) return null; // Mientras se redirige

  return <Outlet />; // Usuario logueado → renderiza dashboard
}
