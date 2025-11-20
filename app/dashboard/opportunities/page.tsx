"use client";

import { useEffect, useState } from "react";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";
import OpportunityForm from "@/components/opportunityForm";
import OpportunityCard from "@/components/opportunityCard";

export default function OpportunitiesPage() {
  const { token } = useAuth();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  useEffect(() => {
    if (!token) return;
    async function load() {
      try {
        const data = await opportunityService.getAll(token);
        setOpportunities(data);
      } catch (err) {
        console.error("Error cargando oportunidades:", err);
      }
    }

    load();
  }, [token]);

  function handleCreated(op: any) {
    setOpportunities((prev) => [...prev, op]);
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-gray-100 flex items-start justify-start px-10 py-20 gap-10 relative">
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <OpportunityForm onCreated={handleCreated} />
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((op) => (
          <OpportunityCard key={op.id} data={op} />
        ))}
      </div>
    </main>
  );
}
