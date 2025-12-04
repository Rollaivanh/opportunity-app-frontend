import { apiFetch } from "@/lib/api";

export const companiesService = {
  createCompany(data: any) {
    return apiFetch("/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getAll() {
    return apiFetch("/companies");
  },
};
