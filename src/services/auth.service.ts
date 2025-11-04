import { http, ensureCsrf } from "./http";
import { ENDPOINTS } from "./endpoints";
import type { User } from "./types";

export async function login(email: string, password: string) {
  await ensureCsrf();
  // Breeze responde 204 si ok
  await http.post(ENDPOINTS.LOGIN, { email, password });
  // pedir el usuario ya autenticado
  const { data } = await http.get<User>(ENDPOINTS.ME);
  return data; // User
}

export async function logout() {
  await http.post(ENDPOINTS.LOGOUT);
}

export async function register(payload: { name: string; email: string; password: string; password_confirmation: string; }) {
  await ensureCsrf();
  await http.post(ENDPOINTS.REGISTER, payload);
  const { data } = await http.get<User>(ENDPOINTS.ME);
  return data;
}

export async function me() {
  const { data } = await http.get<User>(ENDPOINTS.ME);
  return data;
}
