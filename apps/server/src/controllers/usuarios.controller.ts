import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usuarioController = (app: any) =>
  app
    .get("/usuarios", () => {
      return prisma.usuario.findMany();
    })
    .post("/usuarios", async ({ body }: { body: { nombre: string; email: string } }) => {
      const nuevoUsuario = await prisma.usuario.createMany({
        data: {
          nombre: body.nombre,
          email: body.email,
          rol: "PARTICIPANTE"
        }
      });
      return nuevoUsuario;
    });
