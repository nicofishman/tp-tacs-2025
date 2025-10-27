import { EstadoEvento, EstadoInscripcion, RolUsuario } from "@prisma/client";
import { prisma } from "@server/lib/prisma";

export const EstadisticasService = {
  async getEstadisticas() {
    const [
      eventosTotal,
      usuariosTotal,
      inscripcionesTotal,
      inscripcionesConfirmadas,
      inscripcionesWaitlist,
      inscripcionesCanceladas,
      eventosFinalizados,
      eventosEnProceso,
      eventosCancelados,
      eventosPendientes,
      eventosCapacidades,
      usuariosOrganizadores,
      usuariosParticipantes,
    ] = await Promise.all([
      prisma.evento.count(),
      prisma.usuario.count(),
      prisma.inscripcion.count(),
      prisma.inscripcion.count({
        where: { estado: EstadoInscripcion.CONFIRMADO },
      }),
      prisma.inscripcion.count({
        where: { estado: EstadoInscripcion.WAITLIST },
      }),
      prisma.inscripcion.count({
        where: { estado: EstadoInscripcion.CANCELADO },
      }),
      prisma.evento.count({ where: { estado: EstadoEvento.FINALIZADO } }),
      prisma.evento.count({ where: { estado: EstadoEvento.EN_PROCESO } }),
      prisma.evento.count({ where: { estado: EstadoEvento.CANCELADO } }),
      prisma.evento.count({ where: { estado: EstadoEvento.PENDIENTE } }),
      prisma.evento.findMany({ select: { cupoMaximo: true } }),
      prisma.usuario.count({ where: { rol: RolUsuario.ORGANIZADOR } }),
      prisma.usuario.count({ where: { rol: RolUsuario.PARTICIPANTE } }),
    ]);

    const capacidadTotal = eventosCapacidades.reduce(
      (acc, e) => acc + (e.cupoMaximo ?? 0),
      0,
    );
    const ocupacionGlobal =
      capacidadTotal > 0 ? inscripcionesConfirmadas / capacidadTotal : 0;

    // Nota: sin historial de estados, esta tasa aproxima conversión como
    // confirmadas sobre (confirmadas + en waitlist) en el estado actual.
    const tasaConversionDesdeWaitlist =
      inscripcionesConfirmadas + inscripcionesWaitlist > 0
        ? inscripcionesConfirmadas /
          (inscripcionesConfirmadas + inscripcionesWaitlist)
        : 0;

    const tasaCancelacion =
      inscripcionesTotal > 0 ? inscripcionesCanceladas / inscripcionesTotal : 0;
    const inscripcionesPorEvento =
      eventosTotal > 0 ? inscripcionesTotal / eventosTotal : 0;

    return {
      eventos: {
        cancelados: eventosCancelados,
        capacidadTotal,
        confirmadasTotales: inscripcionesConfirmadas,
        enProceso: eventosEnProceso,
        finalizados: eventosFinalizados,
        ocupacionGlobal,
        pendientes: eventosPendientes,
      },
      inscripciones: {
        canceladas: inscripcionesCanceladas,
        confirmadas: inscripcionesConfirmadas,
        inscripcionesPorEvento,
        tasaCancelacion,
        tasaConversionDesdeWaitlist,
        waitlist: inscripcionesWaitlist,
      },
      resumen: {
        eventosTotal,
        inscripcionesTotal,
        usuariosOrganizadores,
        usuariosParticipantes,
        usuariosTotal,
      },
    };
  },
};
