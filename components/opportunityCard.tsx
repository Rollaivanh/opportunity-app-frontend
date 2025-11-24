"use client";

import { Opportunity } from "@/types/types";
import { Button } from "./ui/button";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";

export default function OpportunityCard({
  data,
  onDelete, // <— callback desde el padre
}: {
  data: Opportunity;
  onDelete: (id: number) => void;
}) {
  const { token } = useAuth();

  async function handledeleteOpportunity(id: number) {
    if (!token) return console.error("No token available");

    try {
      await opportunityService.deleteOpportunity(id, token);
      onDelete(id); // <— ELIMINA LA CARD INSTANTÁNEAMENTE EN UI
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{data.position}</h3>

      <p className="text-sm text-gray-500">{data.status}</p>

      <p className="text-sm text-gray-400 mt-1">
        {new Date(data.createdAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="mt-5 flex gap-2">
        <Button onClick={() => handledeleteOpportunity(data.id)}>
          Eliminar
        </Button>
        <Button>Editar</Button>
      </div>
    </div>
  );
}
