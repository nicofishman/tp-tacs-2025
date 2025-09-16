import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect old login route to new sign-in route
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  return null;
}
