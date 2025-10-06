import { useAuth } from "@web/components/auth-provider";
import SignInForm from "@web/components/sign-in-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SignIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  );
}
