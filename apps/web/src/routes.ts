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
  route("/sign-in", "./routes/sign-in.tsx"),
  route("/sign-up", "./routes/sign-up.tsx"),
  route("/logout", "./routes/logout.tsx"),

  // Protected routes
  layout("./routes/organizador-layout.tsx", [
    route("/organizador/dashboard", "./routes/organizador/dashboard.tsx"),
    route("/organizador/create-event", "./routes/organizador/create-event.tsx"),
  ]),
  layout("./routes/participante-layout.tsx", [
    route("/my-inscriptions", "./routes/participante/my-inscriptions.tsx"),
  ]),
] satisfies RouteConfig;
