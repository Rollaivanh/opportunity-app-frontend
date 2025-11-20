import { Opportunity } from "@/types/types";

export default function OpportunityCard({ data }: { data: Opportunity }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{data.position}</h3>

      <p className="text-sm text-gray-500">{data.status}</p>

      <p className="text-sm text-gray-400 mt-1">
        {new Date(data.createdAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      {data.company?.name && (
        <p className="text-sm text-gray-700 mt-2">
          Empresa: <span className="font-medium">{data.company.name}</span>
        </p>
      )}

      {data.source && (
        <p className="text-sm text-gray-600">Fuente: {data.source}</p>
      )}

      {data.link && (
        <a
          href={data.link}
          target="_blank"
          className="text-sm text-green-700 underline"
        >
          Ver publicación
        </a>
      )}

      {data.description && (
        <p className="text-sm text-gray-700 mt-2">{data.description}</p>
      )}

      {data.notes && (
        <p className="text-sm text-gray-600 mt-2 italic">{data.notes}</p>
      )}
    </div>
  );
}
