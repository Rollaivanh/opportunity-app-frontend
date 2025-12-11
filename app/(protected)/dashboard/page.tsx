import { CardSummary } from "@/components/CardSummary";
import { Clock, UserRound, Waypoints } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <h1>DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 gap-3">
        <CardSummary
          icon={UserRound}
          total="12.450"
          average={15}
          title={"Total de Postulaciones Efectuadas"}
          toolTipText={"Número total de oportunidades registradas."}
        />
        <CardSummary
          icon={Waypoints}
          total="86.5%"
          average={80}
          title="Oportunidades Activas"
          toolTipText={
            "Oportunidades en estados Aplicado, Entrevista o Seguimiento."
          }
        />
        <CardSummary
          icon={Clock}
          total="4 dias"
          average={30}
          title="Tiempo Promedio de Respuesta"
          toolTipText={
            "Tiempo promedio en días desde que aplicas hasta que recibes una respuesta (positiva o negativa)."
          }
        />
      </div>
    </div>
  );
}
