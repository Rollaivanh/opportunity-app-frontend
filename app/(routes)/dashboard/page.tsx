import { CardSummary } from "@/components/CardSummary";
import { BookOpenCheck, Car, UserRound, Waypoints } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <h1>DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 gap-3">
        <CardSummary
          icon={UserRound}
          total="12.450"
          average={15}
          title={"Opportunities"}
          toolTipText={"See all opportunities"}
        />
        <CardSummary
          icon={Waypoints}
          total="86.5%"
          average={80}
          title="Total Opportuniti"
          toolTipText={"See all of the summary"}
        />
        <CardSummary
          icon={BookOpenCheck}
          total="$395.95"
          average={30}
          title="Bounce Rate"
          toolTipText={"See all of the Bounce Rate"}
        />
      </div>
    </div>
  );
}
