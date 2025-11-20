import { apiFetch } from "@/lib/api";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function refreshSession(refreshToken: string) {
  return apiFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}
