import { apiFetch } from "@/lib/api";

export const simulationService = {
  // Crear simulación
  async createSimulation(data: any, token: string) {
    return apiFetch(
      "/simulations",
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      },
      token
    );
  },

  // Obtener simulaciones por oportunidad
  async getByOpportunity(opportunityId: number, token: string) {
    return apiFetch(
      `/simulations?opportunityId=${opportunityId}`,
      {
        method: "GET",
        credentials: "include",
      },
      token
    );
  },

  // Abrir sesión Retell
  openRetellSession(sessionId: string) {
    window.open(`https://retellai.com/conversation/${sessionId}`, "_blank");
  },

  async getOne(simulationId: number, token: string) {
    return apiFetch(
      `/simulations/${simulationId}`,
      {
        method: "GET",
        credentials: "include",
      },
      token
    );
  },
};
