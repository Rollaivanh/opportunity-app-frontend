import { apiFetch } from "@/lib/api";

export const authService = {
  async register(data: any) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(email: string, password: string) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async refresh() {
    return apiFetch("/auth/refresh", {
      method: "POST",
    });
  },
};
