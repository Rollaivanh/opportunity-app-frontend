"use client";

import OpportunityRow from "./opportunityRow";
import { Opportunity } from "@/types/types";

export default function OpportunitiesTable({
  opportunities,
  onDelete,
  onEdit,
}: {
  opportunities: Opportunity[];
  onDelete: (id: number) => void;
  onEdit: (opportunity: Opportunity) => void;
}) {
  if (!opportunities.length) {
    return (
      <div className="text-sm text-gray-500 mt-4">
        Todavía no registraste ninguna oportunidad. Cuando guardes la primera,
        va a aparecer acá.
      </div>
    );
  }

  return (
    <div className="w-full mt-2">
      {/* HEADER DESKTOP */}
      <div
        className="
          hidden md:grid 
       grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr]
          py-3 px-3 
          text-gray-700 text-xs font-semibold 
          border-b border-gray-300
        "
      >
        <div>Puesto</div>
        <div>Empresa</div>
        <div>Link</div>
        <div>Estado</div>
        <div>Fecha</div>
        <div className="text-right">Acciones</div>
      </div>

      {/* FILAS */}
      {opportunities.map((op) => (
        <OpportunityRow
          key={op.id}
          data={op}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
