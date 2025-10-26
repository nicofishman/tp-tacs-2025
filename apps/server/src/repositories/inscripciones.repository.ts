import { EstadoInscripcion, type Prisma } from "@prisma/client";
import { prisma } from "@server/lib/prisma";
import { mapPrismaEventoToEvento } from "./eventos.repository";

export type InscripcionWithEventoAndUsuario = Prisma.InscripcionGetPayload<{
  include: {
    usuario: true;
    evento: { include: { categoria: true; organizador: true } };
  };
}>;

function mapPrismaInscripcionToInscripcion(
  prismaInscripcion: Prisma.InscripcionGetPayload<{
    include: {
      usuario: true;
      evento: { include: { categoria: true; organizador: true } };
    };
  }>,
): InscripcionWithEventoAndUsuario {
  const evento = prismaInscripcion.evento;
  return {
    estado: prismaInscripcion.estado,
    evento: mapPrismaEventoToEvento(evento),
    eventoId: prismaInscripcion.eventoId,
    fechaRegistro: prismaInscripcion.fechaRegistro,
    id: prismaInscripcion.id,
    usuario: prismaInscripcion.usuario,
    usuarioId: prismaInscripcion.usuarioId,
  };
}

export const InscripcionesRepository = {
  async cancelUserRegistration(eventId: string, userId: string) {
    try {
      return await prisma.inscripcion.updateMany({
        data: {
          estado: EstadoInscripcion.CANCELADO,
        },
        where: {
          eventoId: eventId,
          usuarioId: userId,
        },
      });
    } catch (error) {
      console.error("Error al cancelar inscripción:", error);
      return null;
    }
  },
  async create(
    data: Omit<InscripcionWithEventoAndUsuario, "id">,
  ): Promise<InscripcionWithEventoAndUsuario | null> {
    try {
      const prismaInscripcion = await prisma.inscripcion.create({
        data: {
          estado: data.estado,
          eventoId: data.evento.id,
          fechaRegistro: data.fechaRegistro,
          usuarioId: data.usuario.id,
        },
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
      });
      return mapPrismaInscripcionToInscripcion(prismaInscripcion);
    } catch (error) {
      console.error("Error al crear inscripción:", error);
      return null;
    }
  },

  async delete(id: string): Promise<InscripcionWithEventoAndUsuario | null> {
    try {
      const prismaInscripcion = await prisma.inscripcion.delete({
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
        where: { id },
      });
      return prismaInscripcion
        ? mapPrismaInscripcionToInscripcion(prismaInscripcion)
        : null;
    } catch (error) {
      console.error("Error al eliminar inscripción:", error);
      return null;
    }
  },

  async deleteRegistration(eventId: string, userId: string) {
    try {
      return await prisma.inscripcion.deleteMany({
        where: {
          eventoId: eventId,
          usuarioId: userId,
        },
      });
    } catch (error) {
      console.error("Error al eliminar inscripción:", error);
      throw new Error("Error al eliminar inscripción");
    }
  },

  async findAll(): Promise<InscripcionWithEventoAndUsuario[]> {
    try {
      const inscripciones = await prisma.inscripcion.findMany({
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
      });
      return inscripciones;
    } catch (error) {
      console.error("Error al buscar inscripciones:", error);
      return [];
    }
  },

  async findByEventId(
    eventId: string,
  ): Promise<InscripcionWithEventoAndUsuario[]> {
    try {
      return await prisma.inscripcion.findMany({
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
        where: { eventoId: eventId },
      });
    } catch (error) {
      console.error("Error al buscar inscripciones del evento:", error);
      return [];
    }
  },

  async findById(id: string): Promise<InscripcionWithEventoAndUsuario | null> {
    try {
      const prismaInscripcion = await prisma.inscripcion.findUnique({
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
        where: { id },
      });
      return prismaInscripcion;
    } catch (error) {
      console.error("Error al buscar inscripción por ID:", error);
      return null;
    }
  },

  async findByUserId(
    userId: string,
  ): Promise<InscripcionWithEventoAndUsuario[]> {
    try {
      const inscripciones = await prisma.inscripcion.findMany({
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
        where: { usuarioId: userId },
      });
      return inscripciones.map(mapPrismaInscripcionToInscripcion);
    } catch (error) {
      console.error("Error al buscar inscripciones del usuario:", error);
      return [];
    }
  },

  async findConfirmedRegistrationsByEvent(eventId: string) {
    try {
      return await prisma.inscripcion.findMany({
        where: {
          estado: EstadoInscripcion.CONFIRMADO,
          eventoId: eventId,
        },
      });
    } catch (error) {
      console.error("Error al obtener inscripciones del evento:", error);
      throw new Error("Error al obtener inscripciones del evento");
    }
  },

  async findFirstInWaitlist(eventId: string) {
    try {
      return await prisma.inscripcion.findFirst({
        orderBy: {
          fechaRegistro: "asc",
        },
        where: {
          estado: EstadoInscripcion.WAITLIST,
          eventoId: eventId,
        },
      });
    } catch (error) {
      console.error("Error al buscar primer usuario en waitlist:", error);
      return null;
    }
  },

  async findUserRegistration(eventId: string, userId: string) {
    try {
      return await prisma.inscripcion.findFirst({
        where: {
          eventoId: eventId,
          usuarioId: userId,
        },
      });
    } catch (error) {
      console.error("Error al verificar inscripción:", error);
      throw new Error("Error al verificar inscripción");
    }
  },

  async findWaitlistByEvent(eventId: string) {
    try {
      return await prisma.inscripcion.findMany({
        orderBy: {
          fechaRegistro: "asc",
        },
        where: {
          estado: EstadoInscripcion.WAITLIST,
          eventoId: eventId,
        },
      });
    } catch (error) {
      console.error("Error al obtener waitlist del evento:", error);
      return [];
    }
  },

  async promoteFromWaitlist(inscripcionId: string) {
    try {
      return await prisma.inscripcion.update({
        data: {
          estado: EstadoInscripcion.CONFIRMADO,
        },
        where: {
          id: inscripcionId,
        },
      });
    } catch (error) {
      console.error("Error al promover usuario desde waitlist:", error);
      return null;
    }
  },

  async registerUserToEvent(
    eventId: string,
    userId: string,
    estado: EstadoInscripcion,
  ) {
    try {
      return await prisma.inscripcion.create({
        data: {
          estado: estado,
          eventoId: eventId,
          usuarioId: userId,
        },
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
      });
    } catch (error) {
      console.error("Error al registrar usuario en el evento:", error);
      throw new Error("Error al registrar usuario en el evento");
    }
  },

  async update(
    id: string,
    data: Partial<InscripcionWithEventoAndUsuario>,
  ): Promise<InscripcionWithEventoAndUsuario | null> {
    try {
      const prismaInscripcion = await prisma.inscripcion.update({
        data: {
          ...(data.estado && { estado: data.estado }),
          ...(data.fechaRegistro && { fechaRegistro: data.fechaRegistro }),
        },
        include: {
          evento: {
            include: {
              categoria: true,
              organizador: true,
            },
          },
          usuario: true,
        },
        where: { id },
      });
      return prismaInscripcion
        ? mapPrismaInscripcionToInscripcion(prismaInscripcion)
        : null;
    } catch (error) {
      console.error("Error al actualizar inscripción:", error);
      return null;
    }
  },

  async updateRegistrationState(
    eventId: string,
    userId: string,
    estado: EstadoInscripcion,
  ) {
    try {
      return await prisma.inscripcion.updateMany({
        data: { estado },
        where: {
          eventoId: eventId,
          usuarioId: userId,
        },
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la inscripción:", error);
      throw new Error("Error al actualizar el estado de la inscripción");
    }
  },
};
