import { AuthProvider } from "@web/components/auth-provider";
import ProtectedLayout from "@web/components/protected-layout";

export default function Protected() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
