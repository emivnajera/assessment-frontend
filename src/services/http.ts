// http.ts
import axios, { AxiosHeaders } from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[2]) : null;
}

http.interceptors.request.use((config) => {
  const token = getCookie("XSRF-TOKEN");
  if (token) {
    // Si headers ya es AxiosHeaders, usa .set; si no, crea uno.
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("X-XSRF-TOKEN", token);
    } else if (config.headers) {
      // headers objeto plano
      (config.headers as Record<string, string>)["X-XSRF-TOKEN"] = token;
    } else {
      config.headers = new AxiosHeaders({ "X-XSRF-TOKEN": token });
    }
  }
  return config;
});

export async function ensureCsrf() {
  await http.get("/sanctum/csrf-cookie");
}
