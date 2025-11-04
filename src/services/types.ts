export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  // agrega lo que devuelva tu backend
};

export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};

export type Page<T> = {
  data: T[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
};
