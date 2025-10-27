import { z } from "zod";

export const getEstadisticasSchema = z.object({
  eventos: z.object({
    cancelados: z.number(),
    capacidadTotal: z.number(),
    confirmadasTotales: z.number(),
    enProceso: z.number(),
    finalizados: z.number(),
    ocupacionGlobal: z.number(),
    pendientes: z.number(),
  }),
  inscripciones: z.object({
    canceladas: z.number(),
    confirmadas: z.number(),
    inscripcionesPorEvento: z.number(),
    tasaCancelacion: z.number(),
    tasaConversionDesdeWaitlist: z.number(),
    waitlist: z.number(),
  }),
  resumen: z.object({
    eventosTotal: z.number(),
    inscripcionesTotal: z.number(),
    usuariosOrganizadores: z.number(),
    usuariosParticipantes: z.number(),
    usuariosTotal: z.number(),
  }),
});
