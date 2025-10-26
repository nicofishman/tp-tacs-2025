import { RolUsuario } from "@prisma/client";
import { MeController } from "@server/controllers/me.controller";
import { findAllEventoOutputSchema } from "@server/schemas/eventos/findAll-evento.schema";
import { getMyInscriptionsOutputSchema } from "@server/schemas/me/get-inscriptions.schema";
import { usuarioSchema } from "@server/schemas/usuarios/usuario.schema";
import type { ElysiaWithLogger } from "@server/types";

const RUTA_ME = "/me";

export const MeRouter = (app: ElysiaWithLogger) =>
  app.group(RUTA_ME, { tags: ["Me"] }, (app) =>
    app
      .get(
        "/",
        async ({ user, status }) => {
          return status(200, user);
        },
        {
          response: {
            200: usuarioSchema,
          },
          role: [RolUsuario.ORGANIZADOR, RolUsuario.PARTICIPANTE],
        },
      )
      .get(
        "/inscriptions",
        async ({ user, status }) => {
          const inscriptions = await MeController.findMyInscriptions(user.id);

          return status(
            200,
            inscriptions.map((inscription) => ({
              ...inscription,
              evento: {
                ...inscription.evento,
                fechaInicio: inscription.evento.fechaInicio.toISOString(),
              },
              fechaRegistro: inscription.fechaRegistro.toISOString(),
            })),
          );
        },
        {
          response: {
            200: getMyInscriptionsOutputSchema,
          },
          role: [RolUsuario.PARTICIPANTE],
        },
      )
      .get(
        "/events",
        async ({ user, status }) => {
          const events = await MeController.findMyEvents(user.id);
          return status(
            200,
            events.map((event) => ({
              ...event,
              fechaInicio: event.fechaInicio.toISOString(),
            })),
          );
        },
        {
          response: {
            200: findAllEventoOutputSchema,
          },
          role: [RolUsuario.ORGANIZADOR],
        },
      ),
  );
