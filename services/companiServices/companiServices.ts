import { apiFetch } from "@/lib/api";

export const companiesService = {
  async createCompany(data: any, token: string) {
    return apiFetch(
      "/companies",
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      },
      token
    );
  },

  async getAllCompanies() {
    return apiFetch("/companies");
  },
};
