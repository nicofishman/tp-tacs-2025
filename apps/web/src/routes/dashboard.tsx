import { useAuth } from "@web/components/auth-provider";
import Loader from "@web/components/loader";

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 font-bold text-3xl">Dashboard</h1>
      <p className="text-lg">Welcome back, {user?.name}!</p>
      <div className="mt-6 rounded-lg bg-card p-4 shadow-sm">
        <h2 className="mb-2 font-semibold text-xl">User Information</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>
    </div>
  );
}
