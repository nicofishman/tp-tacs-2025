import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  // Public routes
  index("./routes/_index.tsx"),
  route("/about", "./routes/about.tsx"),
  route("/contact", "./routes/contact.tsx"),
  route("/events", "./routes/events.tsx"),
  route("/my-inscriptions", "./routes/my-inscriptions.tsx"),
  route("/sign-in", "./routes/sign-in.tsx"),
  route("/sign-up", "./routes/sign-up.tsx"),
  route("/logout", "./routes/logout.tsx"),
  route("/create-event", "./routes/create-event.tsx"),

  // Protected routes
  layout("./routes/protected-layout.tsx", [
    route("/dashboard", "./routes/protected/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
