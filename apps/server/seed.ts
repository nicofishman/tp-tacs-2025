import { RolUsuario } from "@prisma/client";
import prisma from "./prisma";

await prisma.usuario.create({
  data: {
    email: "nicofish@gmail.com",
    nombre: "Nicolas Fishman",
    rol: RolUsuario.ADMIN,
  },
});
