"use client";

import { Opportunity } from "@/types/types";
import { Button } from "./ui/button";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";

// BADGES PRO POR ESTADO
function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    SENT: "bg-gray-100 text-gray-700 border-gray-300",
    UNDER_REVIEW: "bg-blue-100 text-blue-700 border-blue-300",
    INTERVIEW: "bg-purple-100 text-purple-700 border-purple-300",
    REJECTED: "bg-red-100 text-red-700 border-red-300",
    ACCEPTED: "bg-green-100 text-green-700 border-green-300",
  };

  return styles[status] || styles["SENT"];
}

export default function OpportunityRow({
  data,
  onDelete,
  onEdit,
}: {
  data: Opportunity;
  onDelete: (id: number) => void;
  onEdit: (op: Opportunity) => void;
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
      className="
        w-full py-4 px-3 border-b border-gray-200
        grid grid-cols-1 gap-2 
        md:grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr]
        items-center text-sm
        hover:bg-green-50/40 transition-colors
      "
    >
      {/* 1) POSICIÓN */}
      <div className="font-semibold text-gray-900 truncate">
        {data.position}
        <span className="md:hidden block text-xs text-gray-500 mt-1">
          {data.company?.name || "Sin empresa"}
        </span>
      </div>

      {/* 2) EMPRESA */}
      <div className="text-gray-700 hidden md:block truncate">
        {data.company?.name || "Sin empresa"}
      </div>

      {/* 3) LINK */}
      <div>
        {data.link ? (
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => window.open(String(data.link), "_blank")}
          >
            Abrir
          </Button>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </div>

      {/* 4) BADGE DE ESTADO */}
      <div className="text-gray-700">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${getStatusBadge(
            data.status
          )}`}
        >
          {data.status}
        </span>
      </div>

      {/* 5) FECHA */}
      <div className="text-gray-500 text-xs md:text-sm">
        {new Date(data.createdAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* 6) ACCIONES */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="secondary"
          className="text-xs"
          onClick={() => onEdit(data)}
        >
          Editar
        </Button>

        <Button
          variant="destructive"
          className="text-xs"
          onClick={() => handledeleteOpportunity(data.id)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
