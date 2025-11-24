import { apiFetch } from "@/lib/api";

export const opportunityService = {
  async createOpportunity(data: any, token: string) {
    return apiFetch(
      "/opportunities",
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      },
      token
    );
  },

  async getAll(token: string | null) {
    if (!token) throw new Error("No token provided");
    return apiFetch("/opportunities", {}, token);
  },

  async deleteOpportunity(id: number, token: string) {
    return apiFetch(`/opportunities/${id}`, { method: "DELETE" }, token);
  },
};
