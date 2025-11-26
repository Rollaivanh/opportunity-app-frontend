"use client";

import { Opportunity } from "@/types/types";
import { Button } from "./ui/button";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";

export default function OpportunityRow({
  data,
  onDelete,
}: {
  data: Opportunity;
  onDelete: (id: number) => void;
}) {
  const { token } = useAuth();

  async function handledeleteOpportunity(id: number) {
    if (!token) return console.error("No token available");

    try {
      await opportunityService.deleteOpportunity(id, token);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    }
  }

  return (
    <div
      className="w-full border-b border-gray-200 py-4 px-2 grid grid-cols-5 items-center text-sm text-gray-800
                    md:grid-cols-5 gap-4"
    >
      {/* POSICIÓN */}
      <div className="font-semibold">{data.position}</div>

      {/* EMPRESA */}
      <div className="text-gray-600">{data.company?.name || "Sin empresa"}</div>

      {/* ESTADO */}
      <div className="text-gray-600">{data.status}</div>

      {/* FECHA */}
      <div className="text-gray-500">
        {new Date(data.createdAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* ACCIONES */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="secondary"
          onClick={() => handledeleteOpportunity(data.id)}
          className="text-xs"
        >
          Eliminar
        </Button>
        <Button className="text-xs">Editar</Button>
      </div>
    </div>
  );
}
