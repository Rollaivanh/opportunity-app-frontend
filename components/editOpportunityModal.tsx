"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { simulationService } from "@/services/simulationServices/simulationServices";
import { useRouter } from "next/navigation";

interface EditOpportunityModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fields: any) => void;
  initialData: any; // Podés tiparlo mejor luego
}

export default function EditOpportunityModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: EditOpportunityModalProps) {
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [simulations, setSimulations] = useState<any[]>([]);

  const router = useRouter();

  // Cargar datos iniciales cuando cambia la oportunidad seleccionada
  useEffect(() => {
    if (!initialData) return;

    setStatus(initialData.status || "");
    setNotes(initialData.notes || "");
    setDescription(initialData.description || "");
    setLink(initialData.link || "");
  }, [initialData]);

  // Cargar simulaciones de esa oportunidad
  useEffect(() => {
    if (!open || !initialData?.id) return;

    async function loadSimulations() {
      try {
        const sims = await simulationService.getByOpportunity(initialData.id);
        setSimulations(sims);
      } catch (err) {
        console.error("Error cargando simulaciones:", err);
      }
    }

    loadSimulations();
  }, [open, initialData]);

  if (!open) return null;

  const statusOptions = [
    { value: "SENT", label: "Enviada" },
    { value: "UNDER_REVIEW", label: "En revisión" },
    { value: "INTERVIEW", label: "Entrevista" },
    { value: "REJECTED", label: "Rechazada" },
    { value: "ACCEPTED", label: "Aceptada" },
  ];

  function handleSave() {
    onSubmit({
      status,
      notes,
      description,
      link,
    });
  }

  // Crear simulación real
  async function handleNewSimulation() {
    try {
      const newSim = await simulationService.createSimulation({
        opportunityId: initialData.id,
        type: "TECHNICAL",
        interviewer_rol: "AI Interviewer",
        notes: "",
      });

      router.push(`/dashboard/trainer/${newSim.id}`);
      onClose();
    } catch (err) {
      console.error("Error creando simulación:", err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Editar oportunidad
        </h2>

        <div className="flex flex-col gap-4">
          {/* Empresa */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
            <p className="text-sm font-semibold text-gray-800">
              {initialData.company?.name || "Empresa sin nombre"}
            </p>
            <p className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
              {initialData.company?.description ||
                "Sin descripción de la empresa"}
            </p>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-700 text-sm">Link de la oferta</Label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.linkedin.com/jobs/..."
              className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-700 text-sm">Estado</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notas */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-700 text-sm">Notas</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Notas personales…"
              className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm resize-none"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1">
            <Label className="text-gray-700 text-sm">Descripción del rol</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Descripción del rol…"
              className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm resize-none"
            />
          </div>

          {/* Simulaciones */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Simulaciones
            </h3>

            <div className="flex justify-end mb-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1"
                onClick={handleNewSimulation}
              >
                Nueva Simulación
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {simulations.length === 0 && (
                <p className="text-xs text-gray-500">
                  Aún no hay simulaciones.
                </p>
              )}

              {simulations.map((sim) => (
                <div
                  key={sim.id}
                  className="border border-gray-200 rounded-md p-3 bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {sim.type} – {sim.interviewer_rol}
                      </p>

                      <p className="text-[11px] text-gray-500 mt-1">
                        Sesión: {sim.retellSessionId || "—"}
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        simulationService.openRetellSession(sim.retellSessionId)
                      }
                      className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1"
                      disabled={!sim.retellSessionId}
                    >
                      Abrir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" className="text-sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="text-sm bg-green-600 hover:bg-green-700"
              onClick={handleSave}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
