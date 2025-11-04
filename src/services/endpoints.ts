export const ENDPOINTS = {
  // Breeze / Auth
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  ME: "/api/user",

  // Usuarios (ejemplo)
  USERS: "/api/users",
  USER: (id: number | string) => `/api/users/${id}`,
};
