import { EstadoInscripcion, type Prisma } from "@prisma/client";
import { QueryError } from "@server/exceptions/QueryError";
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción para cancelar.");
        return null;
      }
      console.error("Error al cancelar inscripción:", error);
      throw new QueryError("Error al cancelar inscripción.");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError(
          "Ya existe una inscripción para este usuario y evento.",
        );
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al crear la inscripción.",
        );
      }
      console.error("Error al crear inscripción:", error);
      throw new QueryError("Error al crear inscripción.");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción para eliminar.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar la inscripción porque está siendo referenciada por otros registros.",
        );
      }
      console.error("Error al eliminar inscripción:", error);
      throw new QueryError("Error al eliminar inscripción.");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción para eliminar.");
        return null;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "No se puede eliminar la inscripción porque está siendo referenciada por otros registros.",
        );
      }
      console.error("Error al eliminar inscripción:", error);
      throw new QueryError("Error al eliminar inscripción.");
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
      throw new QueryError("Error al buscar inscripciones.");
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
      throw new QueryError("Error al buscar inscripciones del evento.");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción con el ID proporcionado.");
        return null;
      }
      console.error("Error al buscar inscripción por ID:", error);
      throw new QueryError("Error al buscar inscripción por ID.");
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
      throw new QueryError("Error al buscar inscripciones del usuario.");
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
      throw new QueryError("Error al obtener inscripciones del evento");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró usuario en waitlist.");
        return null;
      }
      console.error("Error al buscar primer usuario en waitlist:", error);
      throw new QueryError("Error al buscar primer usuario en waitlist.");
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
      throw new QueryError("Error al verificar inscripción");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción para promover.");
        return null;
      }
      console.error("Error al promover usuario desde waitlist:", error);
      throw new QueryError("Error al promover usuario desde waitlist.");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new QueryError(
          "Ya existe una inscripción para este usuario y evento.",
        );
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2003"
      ) {
        throw new QueryError(
          "Error de integridad referencial al registrar usuario en el evento.",
        );
      }
      console.error("Error al registrar usuario en el evento:", error);
      throw new QueryError("Error al registrar usuario en el evento");
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
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2025"
      ) {
        console.error("No se encontró la inscripción para actualizar.");
        return null;
      }
      console.error("Error al actualizar inscripción:", error);
      throw new QueryError("Error al actualizar inscripción.");
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
      throw new QueryError("Error al actualizar el estado de la inscripción");
    }
  },
};
