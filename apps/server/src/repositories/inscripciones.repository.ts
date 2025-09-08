import { prisma } from "@/lib/prisma";
import type { Inscripcion } from "@/types";
import type { Prisma, EstadoInscripcion } from "@prisma/client";
import { mapPrismaEventoToEvento } from "./eventos.repository";

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

	async findAll(): Promise<Inscripcion[]> {
		try {
			const inscripciones = await prisma.inscripcion.findMany({
				include: {
					usuario: true,
					evento: {
						include: {
							categoria: true,
							organizador: true,
						},
					},
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
				where: { id },
				include: {
					usuario: true,
					evento: {
						include: {
							categoria: true,
							organizador: true,
						},
					},
				},
			});
			return prismaInscripcion
				? mapPrismaInscripcionToInscripcion(prismaInscripcion)
				: null;
		} catch (error) {
			console.error("Error al buscar inscripción por ID:", error);
			return null;
		}
	},

	async create(data: Omit<Inscripcion, "id">): Promise<Inscripcion | null> {
		try {
			const prismaInscripcion = await prisma.inscripcion.create({
				data: {
					usuarioId: data.usuario.id,
					eventoId: data.evento.id,
					estado: data.estado,
					fechaRegistro: data.fechaRegistro,
				},
				include: {
					usuario: true,
					evento: {
						include: {
							categoria: true,
							organizador: true,
						},
					},
				},
			});
			return mapPrismaInscripcionToInscripcion(prismaInscripcion);
		} catch (error) {
			console.error("Error al crear inscripción:", error);
			return null;
		}
	},

	async update(
		id: string,
		data: Partial<Inscripcion>,
	): Promise<Inscripcion | null> {
		try {
			const prismaInscripcion = await prisma.inscripcion.update({
				where: { id },
				data: {
					...(data.estado && { estado: data.estado }),
					...(data.fechaRegistro && { fechaRegistro: data.fechaRegistro }),
				},
				include: {
					usuario: true,
					evento: {
						include: {
							categoria: true,
							organizador: true,
						},
					},
				},
			});
			return prismaInscripcion
				? mapPrismaInscripcionToInscripcion(prismaInscripcion)
				: null;
		} catch (error) {
			console.error("Error al actualizar inscripción:", error);
			return null;
		}
	},

	async delete(id: string): Promise<Inscripcion | null> {
		try {
			const prismaInscripcion = await prisma.inscripcion.delete({
				where: { id },
				include: {
					usuario: true,
					evento: {
						include: {
							categoria: true,
							organizador: true,
						},
					},
				},
			});
			return prismaInscripcion
				? mapPrismaInscripcionToInscripcion(prismaInscripcion)
				: null;
		} catch (error) {
			console.error("Error al eliminar inscripción:", error);
			return null;
		}
	},
};

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
		id: prismaInscripcion.id,
		usuario: prismaInscripcion.usuario,
		evento: mapPrismaEventoToEvento(evento),
		estado: prismaInscripcion.estado,
		fechaRegistro:
			prismaInscripcion.fechaRegistro instanceof Date
				? prismaInscripcion.fechaRegistro.toISOString()
				: prismaInscripcion.fechaRegistro,
	};
}
