import { apiFetch } from "@/lib/api";

export const simulationService = {
  createSimulation(data: any) {
    return apiFetch("/simulations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getAll() {
    return apiFetch("/simulations");
  },

  getOne(id: number) {
    return apiFetch(`/simulations/${id}`);
  },

  getByOpportunity(opId: number) {
    return apiFetch(`/simulations?opportunityId=${opId}`);
  },

  startRetellSession(id: number) {
    return apiFetch(`/simulations/${id}/start`, {
      method: "POST",
    });
  },

  openRetellSession(sessionId: string) {
    if (typeof window !== "undefined") {
      window.open(`https://retellai.com/conversation/${sessionId}`, "_blank");
    }
  },
};
