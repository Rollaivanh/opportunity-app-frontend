// Path: components/SimulationTypeBadge.tsx

"use client";

import { Badge } from "@/components/ui/badge";

type SimulationType =
  | "behavioral"
  | "technical"
  | "hr"
  | "negotiation"
  | "culture_fit"
  | "product"
  | "mock_interview";

const TYPE_LABELS: Record<SimulationType, string> = {
  behavioral: "Conductual",
  technical: "Técnica",
  hr: "RRHH",
  negotiation: "Negociación",
  culture_fit: "Culture Fit",
  product: "Producto",
  mock_interview: "Mock Interview",
};

const TYPE_STYLES: Record<SimulationType, string> = {
  behavioral: "bg-blue-100 text-blue-800 border-blue-300",
  technical: "bg-purple-100 text-purple-800 border-purple-300",
  hr: "bg-pink-100 text-pink-800 border-pink-300",
  negotiation: "bg-orange-100 text-orange-800 border-orange-300",
  culture_fit: "bg-teal-100 text-teal-800 border-teal-300",
  product: "bg-indigo-100 text-indigo-800 border-indigo-300",
  mock_interview: "bg-green-100 text-green-800 border-green-300",
};

export function SimulationTypeBadge({ type }: { type: SimulationType }) {
  return (
    <Badge variant="outline" className={TYPE_STYLES[type] + " font-medium"}>
      {TYPE_LABELS[type]}
    </Badge>
  );
}
