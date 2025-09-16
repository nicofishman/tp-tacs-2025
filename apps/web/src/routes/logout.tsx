import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/components/auth-provider";
import Loader from "@/components/loader";

export default function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Logout error:", error);
        navigate("/", { replace: true });
      }
    };

    handleLogout();
  }, [signOut, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader />
        <p className="mt-4 text-gray-600">Signing out...</p>
      </div>
    </div>
  );
}
