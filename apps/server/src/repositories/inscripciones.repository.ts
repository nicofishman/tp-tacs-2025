import { EstadoInscripcion, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Inscripcion } from "@/types";
import { mapPrismaEventoToEvento } from "./eventos.repository";

function mapPrismaInscripcionToInscripcion(
  prismaInscripcion: Prisma.InscripcionGetPayload<{
    include: {
      usuario: true;
      evento: { include: { categoria: true; organizador: true } };
    };
  }>,
): Inscripcion {
  const evento = prismaInscripcion.evento;
  return {
    estado: prismaInscripcion.estado,
    evento: mapPrismaEventoToEvento(evento),
    fechaRegistro:
      prismaInscripcion.fechaRegistro instanceof Date
        ? prismaInscripcion.fechaRegistro.toISOString()
        : prismaInscripcion.fechaRegistro,
    id: prismaInscripcion.id,
    usuario: prismaInscripcion.usuario,
  };
}

export const InscripcionesRepository = {
  async create(data: Omit<Inscripcion, "id">): Promise<Inscripcion | null> {
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

  async delete(id: string): Promise<Inscripcion | null> {
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
  async findAll(): Promise<Inscripcion[]> {
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
      return inscripciones.map(mapPrismaInscripcionToInscripcion);
    } catch (error) {
      console.error("Error al buscar inscripciones:", error);
      return [];
    }
  },

  async findById(id: string): Promise<Inscripcion | null> {
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
      return prismaInscripcion
        ? mapPrismaInscripcionToInscripcion(prismaInscripcion)
        : null;
    } catch (error) {
      console.error("Error al buscar inscripción por ID:", error);
      return null;
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
      });
    } catch (error) {
      console.error("Error al registrar usuario en el evento:", error);
      throw new Error("Error al registrar usuario en el evento");
    }
  },

  async update(
    id: string,
    data: Partial<Inscripcion>,
  ): Promise<Inscripcion | null> {
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
