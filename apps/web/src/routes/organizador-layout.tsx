import { AuthProvider } from "@web/components/auth-provider";
import ProtectedLayout from "@web/components/protected-layout";
import { userContext } from "@web/lib/context";
import { useContext } from "react";
import { organizadorMiddleware } from "./middleware/organizador";

export default function Protected() {
  const serverUser = useContext(userContext);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProtectedLayout />
    </AuthProvider>
  );
}

// Export the middleware for this route
export { organizadorMiddleware as middleware };
