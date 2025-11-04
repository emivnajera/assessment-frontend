import { useEffect, useState } from "react";
import { me, logout } from "../services/auth.service";
import type { User } from "../services/types";


export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const u = await me();
      setUser(u);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    refresh().catch(() => setLoading(false));
  }, []);

  return { user, loading, refresh, signOut };
}
