import z from "zod";
import { usuarioSchema } from "./usuario.schema";

export const findAllUsuariosOutputSchema = z.array(usuarioSchema);

export type FindAllUsuariosOutput = z.infer<typeof findAllUsuariosOutputSchema>;
