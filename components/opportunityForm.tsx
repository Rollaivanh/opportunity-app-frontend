"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { opportunityService } from "@/services/opportunityServices/opportunityServices";
import { companiesService } from "@/services/companiServices/companiServices";

export default function OpportunityForm({
  onCreated,
}: {
  onCreated: (data: any) => void;
}) {
  const { register, handleSubmit, reset } = useForm();
  const { token, loading } = useAuth();

  if (loading) return null;

  async function onSubmit(values: any) {
    if (!token) {
      console.error("Usuario no autenticado.");
      return;
    }

    try {
      // 1) Crear empresa
      const companyPayload = {
        name: values.companyName,
        description: values.companyDescription || null,
        location: values.companyLocation || null,
      };

      const company = await companiesService.createCompany(
        companyPayload,
        token
      );

      // 2) Crear oportunidad (status = SENT por defecto en backend)
      const opportunityPayload = {
        position: values.position,
        description: values.description || null,
        companyId: company.id,
        link: values.link || null,
      };

      const newOpportunity = await opportunityService.createOpportunity(
        opportunityPayload,
        token
      );

      onCreated(newOpportunity);
      reset();
    } catch (err: any) {
      console.error("Error creando oportunidad:", err);
    }
  }

  return (
    <div className="w-full bg-white/80 rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Nueva oportunidad
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Registrá una postulación para poder seguir su estado después.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* POSICIÓN */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Posición</Label>
          <input
            {...register("position", { required: true })}
            placeholder="Frontend Developer"
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          />
        </div>

        {/* NOMBRE DE LA EMPRESA */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Nombre de la empresa</Label>
          <input
            {...register("companyName", { required: true })}
            placeholder="Google, Mercado Libre, Globant..."
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          />
        </div>

        {/* UBICACIÓN DE LA EMPRESA */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Ubicación (opcional)</Label>
          <input
            {...register("companyLocation")}
            placeholder="Remoto · Buenos Aires · Híbrido"
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          />
        </div>
        {/* LINK DE LA OFERTA */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Link de la oferta</Label>
          <input
            {...register("link")}
            placeholder="https://www.linkedin.com/jobs/..."
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm"
          />
        </div>

        {/* DESCRIPCIÓN DE LA EMPRESA */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">
            Descripción de la empresa
          </Label>
          <textarea
            {...register("companyDescription")}
            rows={2}
            placeholder="Agencia digital enfocada en e-commerce..."
            className="bg-transparent border-b border-gray-300 focus:border-gray-800 focus:outline-none py-2 text-gray-900 text-sm resize-none"
          />
        </div>

        {/* DESCRIPCIÓN DEL ROL */}
        <div className="flex flex-col gap-1">
          <Label className="text-gray-600 text-sm">Descripción del rol</Label>
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
