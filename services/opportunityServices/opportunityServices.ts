import { apiFetch } from "@/lib/api";

export const opportunityService = {
  getAll() {
    return apiFetch("/opportunities");
  },

  createOpportunity(data: any) {
    return apiFetch("/opportunities", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateOpportunity(id: number, data: any) {
    return apiFetch(`/opportunities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteOpportunity(id: number) {
    return apiFetch(`/opportunities/${id}`, {
      method: "DELETE",
    });
  },
};
