// Tipo para la sesión del usuario
export interface UserSession {
  userId: string;
  email: string;
  nombre: string;
  rol: "ORGANIZADOR" | "PARTICIPANTE";
  cookies?: string;
}
