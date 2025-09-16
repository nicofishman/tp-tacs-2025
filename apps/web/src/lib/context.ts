import type { Usuario } from "@server/types";
import { createContext } from "react";

export const userContext = createContext<Usuario | null>(null);
