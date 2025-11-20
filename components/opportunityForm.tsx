"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { useAuth } from "@/context/authContext";

const statusOptions = [
  { value: "SENT", label: "Enviada" },
  { value: "UNDER_REVIEW", label: "En revisión" },
  { value: "INTERVIEW", label: "Entrevista" },
  { value: "REJECTED", label: "Rechazada" },
  { value: "ACCEPTED", label: "Aceptada" },
];

export default function OpportunityForm({
  onCreated,
}: {
  onCreated: (data: any) => void;
}) {
  const { register, handleSubmit, reset } = useForm();
  const { token, user, loading } = useAuth();
  console.log(user);

  async function onSubmit(values: any) {
    console.log("USER EN FORM:", user);

    if (!user || !user.id) {
      console.error("Usuario faltante. No se puede crear oportunidad.");
      return;
    }

    const parsed = {
      ...values,
      userId: user.id,
    };

    try {
      const newOpportunity = await opportunityService.createOpportunity(
        parsed,
        token
      );
      onCreated(newOpportunity);
      reset();
    } catch (err: any) {
      console.error("Error al guardar la oportunidad:", err.message);
    }
  }

  // Loading desde el AuthContext (para evitar renders tempranos)
  if (loading) return null;

  return (
    <div className="w-full bg-white/70 rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Nueva oportunidad
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Posición</Label>
          <input
            {...register("position")}
            placeholder="Frontend Developer"
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Estado</Label>
          <select
            {...register("status")}
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          >
            <option value="">Seleccionar estado</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Descripción</Label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Breve descripción del rol"
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
}
