import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "./auth-provider";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        // Validate here before calling API
        signUpSchema.parse(value);

        await signUp(value.email, value.password, value.name);
        toast.success("Sign up successful");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          // field errors will automatically show if we integrate with form fields
          toast.error("Please fix the errors in the form");
        } else {
          toast.error(
            error instanceof Error ? error.message : "Sign up failed",
          );
        }
      }
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <h1 className="mb-6 text-center font-bold text-3xl">Create Account</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: chatgpt
                <p key={i} className="text-red-500">
                  {String(error)}
                </p>
              ))}
            </div>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: chatgpt
                <p key={i} className="text-red-500">
                  {String(error)}
                </p>
              ))}
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: chatgpt
                <p key={i} className="text-red-500">
                  {String(error)}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              className="w-full"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={() => navigate("/sign-in")}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
}
