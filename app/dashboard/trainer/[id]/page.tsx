"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { simulationService } from "@/services/simulationServices/simulationServices";
import type { Simulation } from "@/types/types";
import { useParams } from "next/navigation";

export default function TrainerSimulationPage() {
  const params = useParams();
  const simulationId = Number(params.id);

  const { token } = useAuth();
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  useEffect(() => {
    if (!token || !simulationId) return;

    async function load() {
      try {
        const data = await simulationService.getOne(simulationId, token!);
        setSimulation(data);
      } catch (err) {
        console.error("Error cargando simulación:", err);
      }
    }

    load();
  }, [simulationId, token]);

  if (!simulation) {
    return <div className="p-6">Cargando simulación...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Simulación #{simulation.id}
      </h1>

      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        <p className="text-sm">
          Tipo: <strong>{simulation.type}</strong>
        </p>

        <p className="text-sm">
          Rol entrevistador: <strong>{simulation.interviewer_rol}</strong>
        </p>

        <p className="text-sm mt-2 text-gray-600">
          Notas: {simulation.notes || "—"}
        </p>

        <p className="mt-3 text-xs text-gray-500">
          ID Retell: {simulation.retellSessionId || "Aún no generado"}
        </p>
      </div>
    </div>
  );
}
