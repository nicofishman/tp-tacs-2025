import { AuthProvider } from "@/components/auth-provider";
import ProtectedLayout from "@/components/protected-layout";

export default function Protected() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
