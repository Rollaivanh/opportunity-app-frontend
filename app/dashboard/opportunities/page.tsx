"use client";

import { useEffect, useState } from "react";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";
import OpportunityForm from "@/components/opportunityForm";
import OpportunitiesTable from "@/components/opportunitiesTable";
import EditOpportunityModal from "@/components/editOpportunityModal";

export default function OpportunitiesPage() {
  const { token } = useAuth();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    async function load() {
      try {
        const data = await opportunityService.getAll();
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

  function handleDeleteLocal(id: number) {
    setOpportunities((prev) => prev.filter((op) => op.id !== id));
  }

  function handleEdit(op: any) {
    setEditing(op); // abre modal
  }

  async function handleSaveEdit(fields: any) {
    if (!token || !editing) return;

    try {
      const updated = await opportunityService.updateOpportunity(
        editing.id,
        fields
      );

      setOpportunities((prev) =>
        prev.map((o) => (o.id === editing.id ? updated : o))
      );

      setEditing(null);
    } catch (error) {
      console.error("Error actualizando oportunidad:", error);
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-gray-100 flex items-start justify-center px-10 py-16 gap-10 relative">
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <section className="relative z-10 w-full max-w-sm">
        <OpportunityForm onCreated={handleCreated} />
      </section>

      <section className="relative z-10 flex-1 max-w-3xl">
        <div className="bg-white/70 rounded-lg shadow-md border border-gray-200 p-6 h-full flex flex-col">
          <header className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Mis oportunidades
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Acá vas a ir viendo todas las postulaciones que vas registrando.
            </p>
          </header>

          <div className="flex-1">
            <OpportunitiesTable
              opportunities={opportunities}
              onDelete={handleDeleteLocal}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </section>

      {/* MODAL EDITAR */}
      <EditOpportunityModal
        open={!!editing}
        initialData={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSaveEdit}
      />
    </main>
  );
}
