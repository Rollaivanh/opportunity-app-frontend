// Path: app/dashboard/trainer/page.tsx
"use client";

import useSWR from "swr";
import { simulationService } from "@/services/simulationServices/simulationServices";
import TrainerList from "@/components/TrainerList";
import type { Simulation } from "@/types/types";

const simulationsFetcher = () => simulationService.getAll();

export default function TrainerPage() {
  const {
    data: simulations,
    error,
    isLoading,
    mutate,
  } = useSWR<Simulation[]>("simulations/all", simulationsFetcher);

  if (isLoading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Tus Entrenamientos</h1>
        <p>Cargando simulaciones...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Tus Entrenamientos</h1>
        <p className="text-red-600">
          Error cargando simulaciones: {(error as any).message || "Error"}
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tus Entrenamientos</h1>

        <button
          onClick={() => mutate()}
          className="px-3 py-1 text-sm border rounded-md"
        >
          Refrescar
        </button>
      </div>

      <TrainerList simulations={simulations || []} mutate={mutate} />
    </main>
  );
}
