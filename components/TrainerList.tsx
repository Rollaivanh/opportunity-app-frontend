// Path: app/dashboard/trainer/TrainerList.tsx

import type { Simulation } from "@/types/types";
import TrainerCard from "./TrainerCard";
import type { KeyedMutator } from "swr";

interface TrainerListProps {
  simulations: Simulation[];
  mutate: KeyedMutator<Simulation[]>;
}

export default function TrainerList({ simulations, mutate }: TrainerListProps) {
  if (!simulations.length) {
    return <p>No tenés simulaciones todavía.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {simulations.map((sim) => (
        <TrainerCard key={sim.id} simulation={sim} mutateList={mutate} />
      ))}
    </div>
  );
}
