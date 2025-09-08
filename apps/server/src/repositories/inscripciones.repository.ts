import { prisma } from "@/lib/prisma";
import { EstadoInscripcion } from "@prisma/client";

export const InscripcionesRepository = {
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
        estado: EstadoInscripcion
    ) {
        try {
            return await prisma.inscripcion.create({
                data: {
                    eventoId: eventId,
                    usuarioId: userId,
                    estado: estado,
                },
            });
        } catch (error) {
            console.error("Error al registrar usuario en el evento:", error);
            throw new Error("Error al registrar usuario en el evento");
        }
    },

    async findConfirmedRegistrationsByEvent(eventId: string) {
        try {
            return await prisma.inscripcion.findMany({
                where: {
                    eventoId: eventId,
                    estado: EstadoInscripcion.CONFIRMADO,
                },
            });
        } catch (error) {
            console.error("Error al obtener inscripciones del evento:", error);
            throw new Error("Error al obtener inscripciones del evento");
        }
    },

    async updateRegistrationState(
        eventId: string,
        userId: string,
        estado: EstadoInscripcion
    ) {
        try {
            return await prisma.inscripcion.updateMany({
                where: {
                    eventoId: eventId,
                    usuarioId: userId,
                },
                data: { estado },
            });
        } catch (error) {
            console.error("Error al actualizar el estado de la inscripción:", error);
            throw new Error("Error al actualizar el estado de la inscripción");
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
};
