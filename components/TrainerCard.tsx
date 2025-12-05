// Path: app/dashboard/trainer/TrainerCard.tsx
"use client";

import type { Simulation } from "@/types/types";
import { simulationService } from "@/services/simulationServices/simulationServices";
import type { KeyedMutator } from "swr";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { StatusBadge } from "@/components/StatusBadge";
import { SimulationTypeBadge } from "@/components/SimulationTypeBadge";

interface TrainerCardProps {
  simulation: Simulation;
  mutateList: KeyedMutator<Simulation[]>;
}

export default function TrainerCard({
  simulation,
  mutateList,
}: TrainerCardProps) {
  const createdAt = simulation.createdAt
    ? new Date(simulation.createdAt).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  async function handleStart() {
    try {
      // Crea sesión Retell
      const updated = await simulationService.startRetellSession(simulation.id);

      // Refresca lista en SWR (volverá a traer los datos actualizados)
      await mutateList();

      // Abre Retell si vino ID
      if (updated.retellSessionId) {
        simulationService.openRetellSession(updated.retellSessionId);
      }
    } catch (err: any) {
      alert("No se pudo iniciar la simulación: " + err.message);
    }
  }

  function handleReopen() {
    if (simulation.retellSessionId) {
      simulationService.openRetellSession(simulation.retellSessionId);
    }
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          {/* Badge del tipo de simulación */}
          <SimulationTypeBadge type={simulation.type as any} />

          {/* Badge del estado */}
          <StatusBadge status={simulation.status as any} />
        </div>

        <CardTitle className="mt-2 text-base font-semibold">
          Simulación #{simulation.id}
        </CardTitle>

        <CardDescription>
          Oportunidad #{simulation.opportunityId}
          {createdAt && <> · Creada el {createdAt}</>}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        {simulation.notes
          ? simulation.notes
          : "Practicá esta simulación para entrenar tus respuestas antes de la entrevista real."}
      </CardContent>

      <CardFooter className="flex justify-end">
        {simulation.retellSessionId ? (
          <Button size="sm" variant="outline" onClick={handleReopen}>
            Reabrir sesión
          </Button>
        ) : (
          <Button size="sm" onClick={handleStart}>
            Iniciar simulación
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
