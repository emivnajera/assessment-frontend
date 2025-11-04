import { http } from "./http";
import { ENDPOINTS } from "./endpoints";
import type { Page, User } from "./types";

export async function listUsers(params?: { page?: number; search?: string; }) {
  const { data } = await http.get<Page<User>>(ENDPOINTS.USERS, { params });
  return data;
}

export async function getUser(id: number | string) {
  const { data } = await http.get<User>(ENDPOINTS.USER(id));
  return data;
}
