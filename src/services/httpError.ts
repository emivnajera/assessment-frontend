import { isAxiosError } from "axios";
import type { ApiError } from "../services/types";

// Estructura típica de error en Laravel (ajústala si tu API devuelve más campos)
type BackendError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function toApiError(err: unknown): ApiError {
  let status = 0;
  let message = "Ocurrió un error inesperado";
  let errors: Record<string, string[]> | undefined;

  if (isAxiosError<BackendError>(err)) {
    status = err.response?.status ?? 0;
    const data = err.response?.data;

    if (status === 422) message = "Validación: revisa los campos.";
    else if (status === 401) message = "No autorizado. Inicia sesión.";
    else if (status >= 500) message = "Error del servidor. Intenta más tarde.";
    else if (data?.message) message = data.message;
    else if (err.message) message = err.message; // mensaje de Axios

    errors = data?.errors;
  } else if (err instanceof Error) {
    message = err.message; // error no-Axios
  }

  return { status, message, errors };
}
