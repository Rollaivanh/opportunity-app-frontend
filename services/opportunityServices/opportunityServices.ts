const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const opportunityService = {
  async createOpportunity(data: any, token: string) {
    const res = await fetch(`${API_URL}/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Error creating opportunity:", error);
      throw new Error(error.message || "Error creating opportunity");
    }

    return res.json();
  },

  async getOpportunities(token: string) {
    const res = await fetch(`${API_URL}/opportunities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error fetching opportunities");

    return res.json();
  },

  async getOne(id: number, token: string) {
    const res = await fetch(`${API_URL}/opportunities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Error fetching opportunity");
    return res.json();
  },

  async updateOpportunity(id: number, data: any, token: string) {
    const res = await fetch(`${API_URL}/opportunities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error updating");
    return res.json();
  },

  async deleteOpportunity(id: number, token: string) {
    const res = await fetch(`${API_URL}/opportunities/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Error deleting");
    return res.json();
  },
};
