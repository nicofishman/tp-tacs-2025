// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función helper para formatear fechas
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
    ...options,
  });
}

// Función helper para truncar texto
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
