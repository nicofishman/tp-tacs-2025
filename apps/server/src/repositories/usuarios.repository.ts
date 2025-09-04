import prisma from "../../prisma/index";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";

export class UsuariosRepository {
    // Se usa async para permitir operaciones asíncronas => El controller podra usar await (Manejando problemas de concurrencia)
    async findAll() {
        return prisma.usuario.findMany();
    }

    async findById(id: string) {
        return prisma.usuario.findUnique({
            where: { id },
        });
    }

    async create(data: CreateUsuarioDto) {
        return prisma.usuario.create({ data });
    }

}