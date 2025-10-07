import { AuthProvider } from "@web/components/auth-provider";
import ProtectedLayout from "@web/components/protected-layout";
import { userContext } from "@web/lib/context";
import { useContext } from "react";
import { middleware as authMiddleware } from "./middleware/auth";

export default function Protected() {
  const serverUser = useContext(userContext);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProtectedLayout />
    </AuthProvider>
  );
}

// Export the middleware for this route
export { authMiddleware as middleware };
