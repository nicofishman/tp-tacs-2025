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

  // Protected routes - ORGANIZADOR
  layout("./routes/organizador-layout.tsx", [
    route("/dashboard", "./routes/organizador/dashboard.tsx"),
    route("/create-event", "./routes/organizador/create-event.tsx"),
    route("/edit-event/:id", "./routes/organizador/edit-event.tsx"),
  ]),

  // Protected routes - PARTICIPANTE
  layout("./routes/participante-layout.tsx", [
    route("/my-inscriptions", "./routes/participante/my-inscriptions.tsx"),
  ]),
] satisfies RouteConfig;
