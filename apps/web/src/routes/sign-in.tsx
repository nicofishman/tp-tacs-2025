import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../components/auth-provider";
import Loader from "../components/loader";
import SignInForm from "../components/sign-in-form";
export default function SignIn() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/";

  // Mientras se carga el usuario, mostrar loader
  if (isLoading) return <Loader />;

  // Si ya está logueado, redirigir al destino
  if (user) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  );
}
