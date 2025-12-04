import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    SENT: "Enviada",
    UNDER_REVIEW: "En revisión",
    INTERVIEW: "Entrevista",
    REJECTED: "Rechazada",
    ACCEPTED: "Aceptada",
  };

  const styleMap: Record<string, string> = {
    SENT: "bg-yellow-100 text-yellow-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
    INTERVIEW: "bg-purple-100 text-purple-800",
    REJECTED: "bg-red-100 text-red-800",
    ACCEPTED: "bg-green-100 text-green-800",
  };

  const st = status || "SENT";

  return <Badge className={styleMap[st]}>{map[st]}</Badge>;
}
