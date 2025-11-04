import axios, { AxiosError } from "axios";

// Leer baseURL del .env del FRONTEND
const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const http = axios.create({
  baseURL,
  withCredentials: true,                // 🔑 cookies (Sanctum)
  headers: { Accept: "application/json" },
});

// —— Interceptor de respuesta: normaliza errores ——
http.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    // Puedes loguear o re-mapear mensajes aquí
    // Ej: enviar a Sentry, o transformar estructura
    return Promise.reject(err);
  }
);

// —— Helper para Sanctum CSRF (llamar antes de POST/PUT/PATCH/DELETE) ——
export async function ensureCsrf() {
  // idempotente: si ya existe cookie, Laravel responde 204 igualmente
  await http.get("/sanctum/csrf-cookie");
}
