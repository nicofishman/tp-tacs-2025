import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./auth-provider";
import Loader from "./loader";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <Outlet />;
}
